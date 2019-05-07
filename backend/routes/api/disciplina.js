const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkUserRole = require("../../utils/checkUserRole");

const DisciplinaController = require("../../controllers/disciplinaController");

// @route   GET api/disciplina/
// @desc    Get all disciplinas
// @returns All disciplinas
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  DisciplinaController.getDisciplinas
);

// @route   GET api/disciplina/:id
// @desc    Get single disciplina
// @returns One disciplina
// @access  private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  DisciplinaController.getDisciplina
);

// @route   POST api/disciplina/
// @desc    Create a disciplina
// @params  Name
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.createDisciplina
);

// @route   GET api/disciplina/discProf
// @desc    Get all disciplinas vinculated to professor
// @params  Matricula
// @access  private
router.get(
  "/discProf/:matricula",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.getDisciplinasProfessor
);

// @route   GET api/disciplina/discProf/:matricula/:id
// @desc    Get a disciplina vinculated to professor
// @params  Matricula
// @access  private
router.get(
  "/discProf/:matricula/:id",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.getDisciplinaProfessor
);

// @route   DELETE api/disciplina/deleteDisciplina
// @desc    Delete a disciplina
// @params  Disciplina ID
// @access  private
router.delete(
  "/deleteDisciplina",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.deleteDisciplina
);

// @route   DELETE api/disciplina/deleteProfDisciplina
// @desc    Delete a disciplina vinculated to professor
// @params  Matricula and Disciplina ID
// @access  private
router.delete(
  "/deleteProfDisciplina/:matricula/:id",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.deleteProfDisciplina
);

// @route   POST api/disciplina/addDiscProf
// @desc    Vinculate a disciplina and professor
// @params  Disciplina ID and matricula
// @access  private
router.post(
  "/addDiscProf",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.addDisciplinaProfessor
);

// @route   PUT api/disciplina/updateDisciplina
// @desc    Update a disciplina
// @params  Disciplina ID and nome
// @access  private

router.put(
  "/updateDisciplina",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.updateDisciplina
);

module.exports = router;
