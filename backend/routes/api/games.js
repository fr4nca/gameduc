const express = require("express");
const router = express.Router();
const passport = require("passport");

const GameController = require("../../controllers/gameController");

// @route   GET api/games/
// @desc    Get all games
// @returns All games
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  GameController.getGames
);

module.exports = router;
