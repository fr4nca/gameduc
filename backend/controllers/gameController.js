const db = require("../config/db");

class GameController {
  static getGames(req, res, next) {
    const { papel } = req.user;
    if (papel === "professor") {
      try {
        const { matricula } = req.body;
        db.query(
          "SELECT * FROM GAME WHERE DISCIPLINA_has_PROFESSOR_PROFESSOR_matricula = ?",
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
          "SELECT G.* FROM GAME_has_ALUNO as GA INNER JOIN GAME as G ON G.id = GA.GAME_id WHERE GA.ALUNO_matricula = ?",
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
    const { nome, dta_inicio, dta_fim, disciplinaId, matricula } = req.body;
    try {
      db.query(
        "INSERT INTO GAME(nome, dta_inicio, dta_fim, DISCIPLINA_has_PROFESSOR_DISCIPLINA_id, DISCIPLINA_has_PROFESSOR_PROFESSOR_matricula) VALUES(?, ?, ?, ?, ?)",
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
}

module.exports = GameController;
