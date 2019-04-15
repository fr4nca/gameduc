const db = require("../config/db");

class DisciplinaController {
  static async getDisciplina(req, res, next) {
    try {
      const { id } = req.params;

      const results = await db.query(
        "SELECT * FROM tb_disciplina WHERE id = ?",
        [id]
      );
      let disciplina;
      if (results.length > 0) disciplina = results[0];
      return res.json(disciplina);
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

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
      const { matricula, id } = req.params;

      const results = await db.query(
        "SELECT D.id, D.nome FROM ta_professor_disciplina as DP INNER JOIN tb_disciplina as D ON D.id = DP.tb_disciplina_id WHERE DP.tb_professor_matricula = ? and D.id = ?",
        [matricula, id]
      );
      let disciplina;
      if (results.length > 0) disciplina = results[0];
      return res.json(disciplina);
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async getDisciplinasProfessor(req, res, next) {
    try {
      const { matricula } = req.params;

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


  static async updateDisciplina (req, res, next){
    
    try{
      const { disciplinaId, newNome } = req.body

      await db.query (
        `UPDATE tb_disciplina SET nome = ? WHERE id = ?`, [ newNome, disciplinaId]
      )
      return res.json({message: 'Disciplina alterada com sucesso'});

    } catch (err){
      return res.status(400).json({error: err.sqlMessage});
    }
  }

  static async deleteDisciplina (req, res, next) {
    try {
      const { disciplinaId } = req.body
      await db.query (
        `DELETE FROM tb_disciplina WHERE id = ? `, [disciplinaId]
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
