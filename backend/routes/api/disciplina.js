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
  checkUserRole(["professor"]),
  DisciplinaController.getDisciplinas
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

// @route   POST api/disciplina/addDiscProf
// @desc    Create a disciplina
// @params  Disciplina ID and matricula
// @access  private
router.post(
  "/addDiscProf",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.addDisciplinaProfessor
);

// @route   GET api/disciplina/discProf
// @desc    Get all disciplinas vinculated to professor
// @params  Matricula
// @access  private
router.get(
  "/discProf",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.getDisciplinaProfessor
);

<<<<<<< HEAD
// @route   DELETE api/disciplina/deleteDisciplina
// @desc    Delete a disciplina
// @params  Disciplina ID
// @access  private
=======
>>>>>>> 3170748b0611a1058011fcd1b406f597055f4696
router.delete(
  "/deleteDisciplina",
  passport.authenticate("jwt", {session: false}),
  checkUserRole(["professor"]),
  DisciplinaController.deleteDisciplina
)

<<<<<<< HEAD
// @route   DELETE api/disciplina/deleteProfDisciplina
// @desc    Delete a disciplina vinculated to professor
// @params  Matricula and Disciplina ID
// @access  private
router.delete(
  "/deleteProfDisciplina", 
  passport.authenticate("jwt", {session: false}),
  checkUserRole(['professor']),
=======
router.delete(
  "/deleteProfDisciplina", 
  passport.authenticate("jwt", {session: false}),
>>>>>>> 3170748b0611a1058011fcd1b406f597055f4696
  DisciplinaController.deleteProfDisciplina
)

module.exports = router;
