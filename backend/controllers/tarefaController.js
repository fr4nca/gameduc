const db = require("../config/db");

class TarefaController {
  static async getTarefasByGame(req, res, next) {
    const { gameId } = req.body;
    const results = await db.query(
      "SELECT * FROM tb_tarefa WHERE tb_game_id = ?",
      [gameId]
    );
    return res.json(results);
  }

  static async getTarefasByRegra(req, res, next) {
    try {
      const { regraId } = req.body;
      const results = await db.query(
        "SELECT * FROM tb_tarefa WHERE tb_regra_id = ?",
        [regraId] 
      );
      return res.json(results);
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async createTarefa(req, res, next) {
    try {
      const {
        classificacao,
        descricao,
        dta_resolucao,
        tag,
        matricula,
        gameId
      } = req.body;

      const { papel } = req.user;

      let validado;

      if (papel === "professor") {
        validado = true;
      } else if (papel === "aluno") {
        validado = false;
      }

      const results = await db.query(
        "SELECT * FROM tb_regra WHERE tb_game_id = ? and classificacao = ? AND tag = ?",
        [gameId, classificacao, tag]
      );

      let regra;

      if (results.length > 0) {
        regra = results[0];
      } else {
        return res.status(400).json({ message: "Regra não encontrada" });
      }

      await db.query(
        "INSERT INTO tb_tarefa(classificacao, descricao, dta_resolucao, tag, validado, tb_regra_id, tb_aluno_matricula) VALUES(?, ?, ?, ?, ?, ?, ?)",
        [
          classificacao,
          descricao,
          dta_resolucao,
          tag,
          validado,
          regra.id,
          matricula
        ]
      );

      return res.status(200).json({ message: "Tarefa adicionada com sucesso" });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }


  static async deleteTarefa (req, res, next) {
    try {
      const { tarefaId } = req.body
      await db.query (
        `DELETE FROM tb_tarefa WHERE id = ?`, [tarefaId]
      )
      return res.status(200).json({message: "Tarefa deletada"})
    } catch (err) {
      return res.status(400).json({error: err.sqlMessage})
    }
    
  }
}

module.exports = TarefaController;
