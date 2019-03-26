const db = require("../config/db");

class GameController {
  static getGames(req, res, next) {
    const { papel } = req.user;
    if (papel === "professor") {
      try {
        const { matricula } = req.body;
        db.query(
          "SELECT * FROM tb_game WHERE ta_professor_disciplina_tb_professor_matricula = ?",
          [matricula],
          (err, results, fields) => {
            if (err) return console.log(err);
            return res.json(results);
          }
        );
      } catch (e) {
        return console.log(e);
      }
    } else if (papel === "aluno") {
      try {
        const { matricula } = req.body;
        db.query(
          "SELECT G.* FROM ta_game_aluno as GA INNER JOIN tb_game as G ON G.id = GA.tb_game_id WHERE GA.tb_aluno_matricula = ?",
          [matricula],
          (err, results, fields) => {
            if (err) return console.log(err);
            return res.json(results);
          }
        );
      } catch (e) {
        return console.log(e);
      }
    }
  }

  static createGame(req, res, next) {
    try {
      const { nome, dta_inicio, dta_fim, disciplinaId, matricula } = req.body;

      db.query(
        "INSERT INTO tb_game(nome, dta_inicio, dta_fim, ta_professor_disciplina_tb_disciplina_id, ta_professor_disciplina_tb_professor_matricula) VALUES(?, ?, ?, ?, ?)",
        [nome, dta_inicio, dta_fim, disciplinaId, matricula],
        err => {
          if (err) return console.log(err);
          return res.json({ message: "Game criado com sucesso" });
        }
      );
    } catch (e) {
      return console.log(e);
    }
  }

  static getAlunoGame(req, res, next) {
    try {
      const { gameId } = req.body;

      db.query(
        "SELECT A.* FROM ta_game_aluno as GA INNER JOIN tb_aluno as A ON GA.tb_aluno_matricula = A.matricula WHERE GA.tb_game_id = ?",
        [gameId],
        (err, results, field) => {
          if (err) return console.log(err);
          return res.json(results);
        }
      );
    } catch (e) {
      return console.log(e);
    }
  }

  static addAlunoGame(req, res, next) {
    try {
      const { gameId, matricula } = req.body;

      db.query(
        "INSERT INTO ta_game_aluno(tb_game_id, tb_aluno_matricula) VALUES(?, ?)",
        [gameId, matricula],
        err => {
          if (err) return console.log(err);
          return res.json({ message: "Aluno adicionado com sucesso" });
        }
      );
    } catch (e) {
      return console.log(e);
    }
  }
}

module.exports = GameController;
