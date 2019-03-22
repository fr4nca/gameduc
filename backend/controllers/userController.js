const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../config/db");
const keys = require("../config/keys");

class UserController {
  static register(req, res, next) {
    const {
      matricula,
      nome,
      sobrenome,
      dta_nascimento,
      graduacao,
      curso,
      email,
      senha,
      papel
    } = req.body;
    try {
      db.query(
        "SELECT * FROM USER where email = ?",
        [email],
        (err, results, fields) => {
          if (err) return console.log(err);
          let user;
          if (results.length > 0) user = results[0];
          if (user) {
            return res.status(400).json({ error: "Email ja cadastrado" });
          }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(senha, salt, (err, hashed) => {
              if (err) return console.log(err);
              if (papel === "professor") {
                db.query(
                  `INSERT INTO USER (email, senha, papel) VALUES(?, ?, ?);
                  INSERT INTO PROFESSOR (matricula, nome, sobrenome, dta_nascimento, graduacao, USER_id) VALUES(?, ?, ?, ?, ?, LAST_INSERT_ID());
                  `,
                  [
                    email,
                    hashed,
                    papel,
                    matricula,
                    nome,
                    sobrenome,
                    dta_nascimento,
                    graduacao
                  ],
                  (err, results, fields) => {
                    if (err)
                      return res.status(400).json({ error: err.sqlMessage });
                    return res
                      .status(200)
                      .json({ message: "Usuário criado com sucesso" });
                  }
                );
              } else if (papel === "aluno") {
                db.query(
                  `INSERT INTO USER (email, senha, papel) VALUES(?, ?, ?);
                  INSERT INTO ALUNO (matricula, nome, sobrenome, dta_nascimento, curso, USER_id) VALUES(?, ?, ?, ?, ?, LAST_INSERT_ID());
                  `,
                  [
                    email,
                    hashed,
                    papel,
                    matricula,
                    nome,
                    sobrenome,
                    dta_nascimento,
                    curso
                  ],
                  (err, results, fields) => {
                    if (err)
                      return res.status(400).json({ error: err.sqlMessage });
                    return res
                      .status(200)
                      .json({ message: "Usuário criado com sucesso" });
                  }
                );
              }
            });
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  static login(req, res, next) {
    const { email, senha } = req.body;
    try {
      db.query(
        "SELECT * FROM USER where email = ?",
        [email],
        async (err, results, fields) => {
          if (err) return console.log(err);
          let user;
          if (results.length > 0) user = results[0];
          if (!user) {
            return res.status(400).json({ error: "Email não cadastrado" });
          }
          try {
            const isMatch = await bcrypt.compare(senha, user.senha);

            if (isMatch) {
              const payload = {
                id: user.id,
                papel: user.papel
              };

              jwt.sign(
                payload,
                keys.jwtsecret,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({ token: "Bearer " + token });
                }
              );
            } else {
              return res.status(400).json({ error: "Senha incorreta" });
            }
          } catch (e) {
            return console.log(e);
          }
        }
      );
    } catch (e) {
      return console.log(e);
    }
  }

  static getProfile(req, res, next) {
    try {
      const { id, papel } = req.user;
      db.query(
        `SELECT * FROM ${papel.toUpperCase()} WHERE USER_id = ?`,
        [id],
        (err, results, fields) => {
          if (err)
            return res.status(400).json({ error: "Ocorreu algum problema" });
          let user;
          if (results.length > 0) user = results[0];
          return res.json(user);
        }
      );
    } catch (e) {
      return console.log(e);
    }
  }
}
module.exports = UserController;
