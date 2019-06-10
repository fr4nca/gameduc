const db = require('../config/db');

class GameController {
  static async getGames(req, res, next) {
    try {
      const { papel } = req.user;
      const { matricula } = req.params;
      if (matricula !== 'undefined') {
        if (papel === 'professor') {
          const professor_results = await db.query(
            'SELECT * FROM tb_game WHERE ta_professor_disciplina_tb_professor_matricula = ?',
            [matricula]
          );
          return res.json(professor_results);
        } else if (papel === 'aluno') {
          const aluno_results = await db.query(
            'SELECT G.* FROM ta_game_aluno as GA INNER JOIN tb_game as G ON G.id = GA.tb_game_id WHERE GA.tb_aluno_matricula = ?',
            [matricula]
          );
          return res.json(aluno_results);
        }
      } else {
        return res
          .status(400)
          .json({ error: 'Matrícula não pode ser undefined' });
      }
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async getGamesAtivos(req, res, next) {
    try {
      const { papel } = req.user;
      const { matricula } = req.params;
      if (matricula !== 'undefined') {
        if (papel === 'professor') {
          const professor_results = await db.query(
            'SELECT * FROM tb_game WHERE ta_professor_disciplina_tb_professor_matricula = ? AND dta_inicio <= now() AND dta_fim >= now()',
            [matricula]
          );
          return res.json(professor_results);
        } else if (papel === 'aluno') {
          const aluno_results = await db.query(
            'SELECT G.* FROM ta_game_aluno as GA INNER JOIN tb_game as G ON G.id = GA.tb_game_id WHERE GA.tb_aluno_matricula = ? AND dta_inicio <= now() AND dta_fim >= now()',
            [matricula]
          );
          return res.json(aluno_results);
        }
      } else {
        return res
          .status(400)
          .json({ error: 'Matrícula não pode ser undefined' });
      }
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async getGame(req, res, next) {
    try {
      const { id } = req.params;
      if (id !== 'undefined') {
        const results = await db.query('SELECT * FROM tb_game WHERE id = ?', [
          id
        ]);

        let game;
        if (results.length > 0) game = results[0];
        return res.json(game);
      } else {
        return res.status(400).json({ error: 'Id não pode ser undefined' });
      }
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async createGame(req, res, next) {
    try {
      const { nome, dta_inicio, dta_fim, disciplinaId, matricula } = req.body;

      await db.query(
        'INSERT INTO tb_game(nome, dta_inicio, dta_fim, ta_professor_disciplina_tb_disciplina_id, ta_professor_disciplina_tb_professor_matricula) VALUES(?, ?, ?, ?, ?)',
        [nome, dta_inicio, dta_fim, disciplinaId, matricula]
      );
      return res.json({ message: 'Game criado com sucesso' });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async getAlunoGame(req, res, next) {
    try {
      const { id } = req.params;
      if (id !== 'undefined') {
        const results = await db.query(
          'SELECT A.* FROM ta_game_aluno as GA INNER JOIN tb_aluno as A ON GA.tb_aluno_matricula = A.matricula WHERE GA.tb_game_id = ?',
          [id]
        );

        return res.json(results);
      } else {
        return res.status(400).json({ error: 'ID não pode ser undefined' });
      }
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async addAlunoGame(req, res, next) {
    try {
      const { gameId, matricula } = req.body;

      await db.query(
        'INSERT INTO ta_game_aluno(tb_game_id, tb_aluno_matricula) VALUES(?, ?)',
        [gameId, matricula]
      );
      return res.json({ message: 'Aluno adicionado com sucesso' });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async updateGame(req, res, next) {
    try {
      const { gameId, newNome, newDataInicio, newDataFim } = req.body;
      await db.query(
        `UPDATE tb_game SET nome = ?, dta_inicio = ?, dta_fim = ? WHERE id = ?`,
        [newNome, newDataInicio, newDataFim, gameId]
      );
      return res.status(200).json({ message: 'Game alterado com sucesso' });
    } catch (err) {
      return res.status(400).json({ erro: err.sqlMessage });
    }
  }

  static async deleteGame(req, res, next) {
    try {
      const { gameId } = req.body;
      await db.query(`DELETE FROM tb_game WHERE id = ?`, [gameId]);
      return res.status(200).json({ message: 'Game deletado' });
    } catch (err) {
      return res.status(400).json({ erro: err.sqlMessage });
    }
  }

  static async deleteGameAluno(req, res, next) {
    try {
      const { id, matricula } = req.params;

      await db.query(
        `DELETE FROM ta_game_aluno WHERE tb_game_id = ? AND tb_aluno_matricula = ?`,
        [id, matricula]
      );
      return res.status(200).json({ message: 'GameAluno deletado' });
    } catch (err) {
      return res.status(400).json({ erro: err.sqlMessage });
    }
  }

  static async getRanking(req, res, next) {
    try {
      const { id } = req.params;
      if (id !== 'undefined') {
        let ranking = await db.query(
          `SELECT * FROM ranking WHERE tb_game_id = ? ORDER BY soma DESC`,
          [id]
        );
        return res.json(ranking);
      } else {
        return res.status(400).json({ erro: 'Id não pode ser undefined' });
      }
    } catch (err) {
      return res.status(400).json({ erro: err.sqlMessage });
    }
  }
}

module.exports = GameController;
