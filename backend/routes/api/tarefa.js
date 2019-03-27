const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkUserRole = require("../../utils/checkUserRole");

const TarefaController = require("../../controllers/tarefaController");

// @route   GET api/tarefa/getTarefasByGame
// @desc    Get all tarefas for the current game
// @returns All tarefas
// @access  private
router.get(
  "/getTarefasByGame",
  passport.authenticate("jwt", { session: false }),
  TarefaController.getTarefasByGame
);

// @route   GET api/tarefa/getTarefasByRegra
// @desc    Get all tarefas for a given regra
// @returns All tarefas
// @access  private
router.get(
  "/getTarefasByRegra",
  passport.authenticate("jwt", { session: false }),
  TarefaController.getTarefasByRegra
);

module.exports = router;
