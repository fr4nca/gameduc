const db = require("../config/db");

class DisciplinaController {
  static getDisciplinas(req, res, next) {
    try {
      db.query("SELECT * FROM tb_disciplina", (err, results, fields) => {
        if (err) return res.status(400).json({ error: err.sqlMessage });
        return res.json(results);
      });
    } catch (e) {
      return console.log(e);
    }
  }

  static createDisciplina(req, res, next) {
    try {
      const { nome } = req.body;

      db.query(
        "INSERT INTO tb_disciplina(nome) VALUES(?)",
        [nome],
        (err, results, fields) => {
          if (err) return res.status(400).json({ error: err.sqlMessage });
          return res.json({ message: "Disciplina criada com sucesso" });
        }
      );
    } catch (e) {
      return console.log(e);
    }
  }

  static getDisciplinaProfessor(req, res, next) {
    try {
      const { matricula } = req.body;

      db.query(
        "SELECT D.id, D.nome FROM ta_professor_disciplina as DP INNER JOIN tb_disciplina as D ON D.id= DP.tb_disciplina_id WHERE DP.tb_professor_matricula = ?",
        [matricula],
        (err, results, fields) => {
          if (err) return res.status(400).json({ error: err.sqlMessage });
          return res.json(results);
        }
      );
    } catch (e) {
      return console.log(e);
    }
  }

  static addDisciplinaProfessor(req, res, next) {
    try {
      const { disciplinaId, matricula } = req.body;

      db.query(
        "INSERT INTO ta_professor_disciplina VALUES(?, ?)",
        [matricula, disciplinaId],
        (err, results, fields) => {
          if (err) return res.status(400).json({ error: err.sqlMessage });
          return res.json({ message: "Disciplina vinculada com sucesso" });
        }
      );
    } catch (e) {
      return console.log(e);
    }
  }
}

module.exports = DisciplinaController;
