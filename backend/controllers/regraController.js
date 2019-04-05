const db = require("../config/db");

class RegraController {
  static async getRegras(req, res, next) {
    try {
      const { gameId } = req.body;
      const results = await db.query(
        "SELECT * FROM tb_regra WHERE tb_game_id = ?",
        [gameId]
      );
      return res.json(results);
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async createRegra(req, res, next) {
    try {
      const { gameId, descricao, classificacao, tag, pontuacao } = req.body;
      await db.query(
        "INSERT INTO tb_regra(descricao, classificacao, tag, pontuacao, tb_game_id) VALUES(?, ?, ?, ?, ?)",
        [descricao, classificacao, tag, pontuacao, gameId]
      );
      return res.status(200).json({ message: "Regra criada com sucesso" });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async deleteRegra(req, res, next) {
    try {
      const { regraId } = req.body;
      await db.query(`DELETE FROM tb_regra WHERE id = ?`, [regraId]);
<<<<<<< HEAD
      return res.status(200).json({ message: "Regra deletada" });
=======
      return res.status(200).json({ message: "Regra Deletada!" });
>>>>>>> 3170748b0611a1058011fcd1b406f597055f4696
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }
}

module.exports = RegraController;
