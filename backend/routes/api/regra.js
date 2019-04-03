const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkUserRole = require("../../utils/checkUserRole");

const RegraController = require("../../controllers/regraController");

// @route   GET api/regra/
// @desc    Get all regras for the current game
// @returns All regras
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  RegraController.getRegras
);

// // @route   POST api/regra/
// // @desc    Create a regra
// // @params  Descrição, classificação, tag, pontuação, gameId
// // @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  RegraController.createRegra
);

module.exports = router;
