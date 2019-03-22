const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkUserRole = require("../../utils/checkUserRole");

const DisciplinaController = require("../../controllers/disciplinaController");

// @route   GET api/disciplinas/
// @desc    Get all disciplinas
// @returns All disciplinas
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.getDisciplinas
);

// @route   POST api/disciplinas/
// @desc    Create a disciplina
// @params  Name
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.createDisciplina
);

// @route   POST api/disciplinas/addDiscProf
// @desc    Create a disciplina
// @params  Disciplina ID and matricula
// @access  private
router.post(
  "/addDiscProf",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.addDisciplinaProfessor
);

// @route   GET api/disciplinas/discProf
// @desc    Get all disciplinas vinculated to professor
// @params  Matricula
// @access  private
router.get(
  "/discProf",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  DisciplinaController.getDisciplinaProfessor
);

module.exports = router;
