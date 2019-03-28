const db = require("../config/db");

class TarefaController {
  static getTarefasByGame(req, res, next) {
    try {
      const { gameId } = req.body;
      db.query(
        "SELECT * FROM tb_tarefa WHERE tb_game_id = ?",
        [gameId],
        (err, results, fields) => {
          if (err) return res.status(400).json({ error: err.sqlMessage });
          return res.json(results);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  static getTarefasByRegra(req, res, next) {
    try {
      const { regraId } = req.body;
      db.query(
        "SELECT * FROM tb_tarefa WHERE tb_regra_id = ?",
        [regraId],
        (err, results, fields) => {
          if (err) return res.status(400).json({ error: err.sqlMessage });
          return res.json(results);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  static createTarefa(req, res, next) {
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

      db.query(
        "SELECT * FROM tb_regra WHERE tb_game_id = ? and classificacao = ? AND tag = ?",
        [gameId, classificacao, tag],
        (err, results, fields) => {
          if (err) return res.status(400).json({ error: err.sqlMessage });
          let regra;
          if (results.length > 0) regra = results[0];
          console.log(regra);
          db.query(
            "INSERT INTO tb_tarefa(classificacao, descricao, dta_resolucao, tag, validado, tb_regra_id, tb_aluno_matricula, tb_game_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            [
              classificacao,
              descricao,
              dta_resolucao,
              tag,
              validado,
              regra.id,
              matricula,
              gameId
            ],
            (err, results, fields) => {
              if (err) return res.status(400).json({ error: err.sqlMessage });
              return res
                .status(200)
                .json({ message: "Tarefa adicionada com sucesso" });
            }
          );
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = TarefaController;
