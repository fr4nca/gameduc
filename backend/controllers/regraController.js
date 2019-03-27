const db = require("../config/db");

class RegraController {
  static getRegras(req, res, next) {
    try {
      const { gameId } = req.body;
      db.query(
        "SELECT * FROM tb_regra WHERE tb_game_id = ?",
        [gameId],
        (err, results, fileds) => {
          if (err) return res.status(400).json({ error: err.sqlMessage });
          return res.json(results);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  static createRegra(req, res, next) {
    try {
      const { gameId, descricao, classificacao, tag, pontuacao } = req.body;
      db.query(
        "INSERT INTO tb_regra(descricao, classificacao, tag, pontuacao, tb_game_id) VALUES(?, ?, ?, ?, ?)",
        [descricao, classificacao, tag, pontuacao, gameId],
        (err, results, fileds) => {
          if (err) return res.status(400).json({ error: err.sqlMessage });
          return res.status(200).json({ message: "Regra criada com sucesso" });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = RegraController;
