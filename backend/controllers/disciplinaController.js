const db = require("../config/db");

class DisciplinaController {
  static getDisciplinas(req, res, next) {
    try {
      db.query("SELECT * FROM DISCIPLINA", (err, results, fields) => {
        if (err) return console.log(err);
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
        "INSERT INTO DISCIPLINA(nome) VALUES(?)",
        [nome],
        (err, results, fields) => {
          if (err) return console.log(err);
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
        "SELECT D.id, D.nome FROM DISCIPLINA_has_PROFESSOR as DP INNER JOIN DISCIPLINA as D ON D.id= DP.DISCIPLINA_ID WHERE DP.PROFESSOR_matricula = ?",
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

  static addDisciplinaProfessor(req, res, next) {
    try {
      const { disciplinaId, matricula } = req.body;

      db.query(
        "INSERT INTO DISCIPLINA_has_PROFESSOR VALUES(?, ?)",
        [disciplinaId, matricula],
        (err, results, fields) => {
          if (err) return console.log(err);
          return res.json({ message: "Disciplina vinculada com sucesso" });
        }
      );
    } catch (e) {
      return console.log(e);
    }
  }
}

module.exports = DisciplinaController;
