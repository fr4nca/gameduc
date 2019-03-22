const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkUserRole = require("../../utils/checkUserRole");

const GameController = require("../../controllers/gameController");

// @route   GET api/games/
// @desc    Get all games for the current logged in user
// @returns All games
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  GameController.getGames
);

// @route   POST api/games/
// @desc    Create a game
// @params  Nome, data de inicio, data de fim, id disciplina and matricula professor
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  GameController.createGame
);

module.exports = router;
