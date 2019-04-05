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

// @route   POST api/tarefa/
// @desc    Create tarefa
// @params  Classificacao, descricao, data de resolucao, tag, matricula, game id
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  TarefaController.createTarefa
);

router.delete(
  "/deleteTarefa",
  passport.authenticate("jwt", {session: false}),
<<<<<<< HEAD
  checkUserRole(['professor']),
=======
>>>>>>> 3170748b0611a1058011fcd1b406f597055f4696
  TarefaController.deleteTarefa
)

module.exports = router;
