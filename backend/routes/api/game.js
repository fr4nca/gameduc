const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkUserRole = require("../../utils/checkUserRole");

const GameController = require("../../controllers/gameController");

// @route   GET api/game/
// @desc    Get all games for the current logged in user
// @returns All games
// @access  private
router.get(
  "/all/:matricula",
  passport.authenticate("jwt", { session: false }),
  GameController.getGames
);

// @route   GET api/game/:id
// @desc    Get a single game
// @returns A game
// @access  private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  GameController.getGame
);

// @route   POST api/game/criar
// @desc    Create a game
// @params  Nome, data de inicio, data de fim, id disciplina and matricula professor
// @access  private
router.post(
  "/criar",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  GameController.createGame
);

// @route   GET api/game/getAlunoGame
// @desc    Get all alunos from a game
// @params  Game id
// @access  private
router.get(
  "/getAlunoGame/:id",
  passport.authenticate("jwt", { session: false }),
  GameController.getAlunoGame
);

// @route   POST api/game/addAlunoGame
// @desc    Add a aluno to a game
// @params  Game ID and aluno matricula
// @access  private
router.post(
  "/addAlunoGame",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  GameController.addAlunoGame
);

// @route   DELETE api/game/deleteGame
// @desc    Delete a game
// @params  Game ID
// @access  private
router.delete(
  "/deleteGame",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  GameController.deleteGame
);

// @route   DELETE api/game/deleteGameAluno/:id/:matricula
// @desc    Delete a aluno to a game
// @params  Game ID and matricula
// @access  private
router.delete(
  "/deleteGameAluno/:id/:matricula",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  GameController.deleteGameAluno
);

// @route   UPDATE api/game/updateGame
// @desc    Update a game
// @params  Game ID, nome, data inicio, data Fim
// @access  private
router.put(
  "/updateGame",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  GameController.updateGame
);

// @route   GET api/game/ranking/:id
// @desc    Get ranking
// @params  Game ID
// @access  private
router.get(
  "/ranking/:id",
  passport.authenticate("jwt", { session: false }),
  GameController.getRanking
);

module.exports = router;
