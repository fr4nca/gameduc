const express = require("express");
const router = express.Router();

const GameController = require("../../controllers/gameController");

// @route   GET api/games/
// @desc    Get all games
// @returns All games
// @access  public
router.get("/", GameController.getGames);

module.exports = router;
