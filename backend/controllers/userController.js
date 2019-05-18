const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../config/db");
const keys = require("../config/keys");

class UserController {
  static async register(req, res, next) {
    console.log(req.body);
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
        papel,
        tagId
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
              `INSERT INTO tb_user (email, senha, tagId, papel) VALUES(? ,?, ?, ?);
              INSERT INTO tb_professor (matricula, nome, sobrenome, dta_nascimento, graduacao, tb_user_id) VALUES(?, ?, ?, ?, ?, LAST_INSERT_ID());
              `,
              [
                email,
                hashed,
                tagId,
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
              `INSERT INTO tb_user (email, senha, tagId, papel) VALUES(?, ?, ?, ?);
              INSERT INTO tb_aluno (matricula, nome, sobrenome, dta_nascimento, curso, tb_user_id) VALUES(?, ?, ?, ?, ?, LAST_INSERT_ID());
              `,
              [
                email,
                hashed,
                tagId,
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
          papel: user.papel,
          email: user.email
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

  static async loginWithTag(req, res, next) {
    try {
      const { tagId } = req.body;
      const results = await db.query("SELECT * FROM tb_user where tagId = ?", [
        tagId
      ]);

      let user;
      if (results.length > 0) user = results[0];
      if (!user) {
        return res.status(400).json({ error: "Tag não cadastrada" });
      }
      const isMatch = tagId === user.tagId ? true : false;

      if (isMatch) {
        const payload = {
          id: user.id,
          papel: user.papel,
          email: user.email
        };

        const token = await jwt.sign(payload, keys.jwtsecret, {
          expiresIn: 3600
        });

        return res.json({ token: "Bearer " + token });
      } else {
        return res.status(400).json({ error: "Tag incorreta" });
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

  static async updateUser(req, res, next) {
    try {
      const { papel, id } = req.user;
      const {
        matricula,
        nome,
        sobrenome,
        dta_nascimento,
        graduacao,
        curso,
        email
      } = req.body;

      if (req.user.email != email) {
        const userResults = await db.query(
          "SELECT * FROM tb_user where email = ?",
          [email]
        );

        if (userResults.length > 0) {
          return res.status(400).json({ error: "Email ja cadastrado" });
        }
      }

      if (papel === "professor") {
        await db.query(
          `UPDATE tb_user  SET email = ? WHERE id = ?; 
        UPDATE tb_professor SET nome = ?, sobrenome = ?, dta_nascimento = ?, graduacao = ? WHERE matricula = ?;`,
          [email, id, nome, sobrenome, dta_nascimento, graduacao, matricula]
        );
        return res
          .status(200)
          .json({ message: "Usuário alterado com sucesso" });
      } else if (papel === "aluno") {
        await db.query(
          `UPDATE tb_user  SET email = ? WHERE id = ?;
          UPDATE tb_aluno SET nome = ?, sobrenome = ?, dta_nascimento = ?, curso = ?  WHERE matricula = ?;
            `,
          [email, id, nome, sobrenome, dta_nascimento, curso, matricula]
        );
        return res
          .status(200)
          .json({ message: "Usuário alterado com sucesso" });
      }
    } catch (err) {
      if (err.sqlMessage)
        return res.status(400).json({ error: err.sqlMessage });
      else return res.status(400).json({ error: err });
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.user;

      await db.query(`DELETE FROM tb_user WHERE id = ?`, [id]);
      return res.status(200).json({ message: "Usuário deletado" });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async getRelatorioPainelProfessor(req, res, next) {
    try {
      const { matricula } = req.params;
      if (matricula !== "undefined") {
        const results = await db.query(
          `
      SELECT count(G.id) AS games FROM tb_game as G WHERE G.ta_professor_disciplina_tb_professor_matricula = ? AND G.dta_inicio <= now() AND G.dta_fim >= now();
      SELECT count(TA.tb_aluno_matricula) AS alunos FROM ta_game_aluno AS TA INNER JOIN tb_game AS G ON G.id = TA.tb_game_id WHERE G.ta_professor_disciplina_tb_professor_matricula = ?;
      SELECT count(TA.tb_disciplina_id) as disciplinas FROM ta_professor_disciplina AS TA WHERE TA.tb_professor_matricula = ?;
      SELECT count(T.id) as tarefas FROM tb_tarefa AS T INNER JOIN tb_game as G ON G.id = T.tb_game_id WHERE G.ta_professor_disciplina_tb_professor_matricula = ? AND T.validado = 1;
      `,
          [matricula, matricula, matricula, matricula]
        );

        const data = [
          ...results[0],
          ...results[1],
          ...results[2],
          ...results[3]
        ];
        return res.status(200).json(data);
      } else {
        return res
          .status(400)
          .json({ error: "Matrícula não pode ser undefined" });
      }
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async getRelatorioPainelAluno(req, res, next) {
    try {
      const { matricula } = req.params;

      if (matricula !== "undefined") {
        const results = await db.query(
          `SELECT * FROM relatorio_aluno WHERE matricula = ?;`,
          [matricula]
        );

        return res.status(200).json(results);
      } else {
        return res
          .status(400)
          .json({ error: "Matrícula não pode ser undefined" });
      }
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async getPontuacao(req, res, next) {
    try {
      const { matricula } = req.params;

      if (matricula !== "undefined") {
        const results = await db.query(
          `SELECT sum(R.pontuacao) AS pontuacao, count(T.id) AS tarefas FROM tb_tarefa as T INNER JOIN tb_regra AS R ON T.tb_regra_id = R.id WHERE T.validado = 1 AND T.tb_aluno_matricula = ?;
          SELECT count(G.id) AS games FROM tb_game AS G INNER JOIN ta_game_aluno AS TA ON TA.tb_game_id = G.id WHERE TA.tb_aluno_matricula = ?;SELECT count(T.id) AS tarefasNaoValidadas FROM tb_tarefa AS T WHERE T.validado = 0 AND T.tb_aluno_matricula = ?;`,
          [matricula, matricula, matricula]
        );

        const data = [...results[0], ...results[1], ...results[2]];

        return res.json(data);
      } else {
        return res
          .status(400)
          .json({ error: "Matrícula não pode ser undefined" });
      }
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }
}

module.exports = UserController;
