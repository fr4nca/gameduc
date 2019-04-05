const db = require("../config/db");

class DisciplinaController {
  static async getDisciplinas(req, res, next) {
    try {
      const results = await db.query("SELECT * FROM tb_disciplina");
      return res.json(results);
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async createDisciplina(req, res, next) {
    try {
      const { nome } = req.body;

      await db.query("INSERT INTO tb_disciplina(nome) VALUES(?)", [nome]);

      return res.json({
        message: "Disciplina criada com sucesso"
      });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async getDisciplinaProfessor(req, res, next) {
    try {
      const { matricula } = req.body;

      const results = await db.query(
        "SELECT D.id, D.nome FROM ta_professor_disciplina as DP INNER JOIN tb_disciplina as D ON D.id= DP.tb_disciplina_id WHERE DP.tb_professor_matricula = ?",
        [matricula]
      );

      return res.json(results);
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async addDisciplinaProfessor(req, res, next) {
    try {
      const { disciplinaId, matricula } = req.body;

      await db.query("INSERT INTO ta_professor_disciplina VALUES(?, ?)", [
        matricula,
        disciplinaId
      ]);

      return res.json({ message: "Disciplina vinculada com sucesso" });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async deleteDisciplina (req, res, next) {
    try {
      const { disciplinaID } = req.body
      await db.query (
        `DELETE FROM tb_disciplina WHERE id = ? `, [disciplinaID]
      )
      return res.status(200).json({message: "Disciplina deletada"})
    }catch(err) {
      return res.status(400).json({erro: err.sqlMessage})
    }
  }

  static async deleteProfDisciplina(req, res, next){
    try{
      const {matricula, disciplinaId} = req.body
      await db.query(
        `DELETE FROM ta_professor_disciplina WHERE tb_professor_matricula = ? AND tb_disciplina_id = ?`, [matricula, disciplinaId]
      )
      return res.status(200).json({message: "Disciplina desvinculada"})
    }catch(err){
      return res.status(400).json({erro: err.sqlMessage})
    }
  }
}

module.exports = DisciplinaController;
