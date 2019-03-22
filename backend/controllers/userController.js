const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../config/db");
const keys = require("../config/keys");

class UserController {
  static register(req, res, next) {
    const { matricula, nome, email, senha, tipo } = req.body;
    try {
      db.query(
        "SELECT * FROM ALUNO where matricula = ? UNION SELECT * FROM PROFESSOR where matricula = ?",
        [matricula, matricula],
        (err, results, fields) => {
          if (err) return console.log(err);
          let user;
          if (results.length > 0) user = results[0];
          if (user) {
            return res.status(400).json({ error: "Matricula ja cadastrada" });
          }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(senha, salt, (err, hashed) => {
              if (err) return console.log(err);
              if (tipo === "professor") {
                db.query(
                  "INSERT INTO PROFESSOR VALUES(?, ?, ?, ?)",
                  [matricula, nome, email, hashed],
                  (err, results, fields) => {
                    if (err)
                      return res.status(400).json({ error: err.sqlMessage });
                    return res
                      .status(200)
                      .json({ message: "Usuário criado com sucesso" });
                  }
                );
              } else if (tipo === "aluno") {
                db.query(
                  "INSERT INTO ALUNO VALUES(?, ?, ?, ?)",
                  [matricula, nome, email, hashed],
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
        "SELECT * FROM ALUNO where email = ? UNION SELECT * FROM PROFESSOR where email = ?",
        [email, email],
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
                matricula: user.matricula
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
              return res.status(400).json({ error: "Password incorrect" });
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

  static current(req, res, next) {
    res.json(req.user);
  }
}
module.exports = UserController;
