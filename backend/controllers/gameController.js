const db = require("../config/db");

class GameController {
  static async getGames(req, res, next) {
    try {
      const { papel } = req.user;
      if (papel === "professor") {
        const { matricula } = req.body;
        const professor_results = await db.query(
          "SELECT * FROM tb_game WHERE ta_professor_disciplina_tb_professor_matricula = ?",
          [matricula]
        );
        return res.json(professor_results);
      } else if (papel === "aluno") {
        const { matricula } = req.body;
        const aluno_results = await db.query(
          "SELECT G.* FROM ta_game_aluno as GA INNER JOIN tb_game as G ON G.id = GA.tb_game_id WHERE GA.tb_aluno_matricula = ?",
          [matricula]
        );
        return res.json(aluno_results);
      }
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async createGame(req, res, next) {
    try {
      const { nome, dta_inicio, dta_fim, disciplinaId, matricula } = req.body;

      await db.query(
        "INSERT INTO tb_game(nome, dta_inicio, dta_fim, ta_professor_disciplina_tb_disciplina_id, ta_professor_disciplina_tb_professor_matricula) VALUES(?, ?, ?, ?, ?)",
        [nome, dta_inicio, dta_fim, disciplinaId, matricula]
      );
      return res.json({ message: "Game criado com sucesso" });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async getAlunoGame(req, res, next) {
    try {
      const { gameId } = req.body;
      const results = await db.query(
        "SELECT A.* FROM ta_game_aluno as GA INNER JOIN tb_aluno as A ON GA.tb_aluno_matricula = A.matricula WHERE GA.tb_game_id = ?",
        [gameId]
      );
      return res.json(results);
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async addAlunoGame(req, res, next) {
    try {
      const { gameId, matricula } = req.body;

      await db.query(
        "INSERT INTO ta_game_aluno(tb_game_id, tb_aluno_matricula) VALUES(?, ?)",
        [gameId, matricula]
      );
      return res.json({ message: "Aluno adicionado com sucesso" });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }
}

module.exports = GameController;
