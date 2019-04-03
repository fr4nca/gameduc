const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../config/db");
const keys = require("../config/keys");

class UserController {
  static async register(req, res, next) {
    try {
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

      const userResults = await db.query(
        "SELECT * FROM tb_user where email = ?",
        [email]
      );

      if (userResults.length > 0) {
        return res.status(400).json({ error: "Email ja cadastrado" });
      }

      const perfilResults = await db.query(
        `SELECT * FROM tb_aluno where matricula = ?;
         SELECT * FROM tb_professor where matricula = ?`,
        [matricula, matricula]
      );

      if (perfilResults[0].length > 0 || perfilResults[1].length > 0) {
        return res.status(400).json({ error: "Matricula ja cadastrada" });
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(senha, salt, async (err, hashed) => {
          if (err) throw err;
          if (papel === "professor") {
            await db.query(
              `INSERT INTO tb_user (email, senha, papel) VALUES(?, ?, ?);
              INSERT INTO tb_professor (matricula, nome, sobrenome, dta_nascimento, graduacao, tb_user_id) VALUES(?, ?, ?, ?, ?, LAST_INSERT_ID());
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
              ]
            );
            return res
              .status(200)
              .json({ message: "Usuário criado com sucesso" });
          } else if (papel === "aluno") {
            await db.query(
              `INSERT INTO tb_user (email, senha, papel) VALUES(?, ?, ?);
              INSERT INTO tb_aluno (matricula, nome, sobrenome, dta_nascimento, curso, tb_user_id) VALUES(?, ?, ?, ?, ?, LAST_INSERT_ID());
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
              ]
            );
            return res
              .status(200)
              .json({ message: "Usuário criado com sucesso" });
          }
        });
      });
    } catch (err) {
      if (err.sqlMessage)
        return res.status(400).json({ error: err.sqlMessage });
      else return res.status(400).json({ error: err });
    }
  }

  static async login(req, res, next) {
    try {
      const { email, senha } = req.body;

      const results = await db.query("SELECT * FROM tb_user where email = ?", [
        email
      ]);

      let user;
      if (results.length > 0) user = results[0];
      if (!user) {
        return res.status(400).json({ error: "Email não cadastrado" });
      }
      const isMatch = await bcrypt.compare(senha, user.senha);

      if (isMatch) {
        const payload = {
          id: user.id,
          papel: user.papel
        };

        const token = await jwt.sign(payload, keys.jwtsecret, {
          expiresIn: 3600
        });

        return res.json({ token: "Bearer " + token });
      } else {
        return res.status(400).json({ error: "Senha incorreta" });
      }
    } catch (err) {
      if (err.sqlMessage)
        return res.status(400).json({ error: err.sqlMessage });
      else return res.status(400).json({ error: err });
    }
  }

  static async getProfile(req, res, next) {
    try {
      const { id, papel } = req.user;
      const results = await db.query(
        `SELECT * FROM tb_${papel} WHERE tb_user_id = ?`,
        [id]
      );

      let user;
      if (results.length > 0) user = results[0];
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async getAlunos(req, res, next) {
    try {
      const results = await db.query(`SELECT * FROM tb_aluno`);

      return res.json(results);
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { papel, id } = req.user;
      const { matricula } = req.body;

      await db.query(
        `DELETE FROM tb_${papel} WHERE matricula = ?; DELETE FROM tb_user WHERE id = ?`,
        [matricula, id]
      );
      return res.status(200).json({ message: "Usuário deletado" });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }
}

module.exports = UserController;
