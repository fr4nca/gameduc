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
  "/:gameId",
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

// // @route   DELETE api/regra/deleteRegra
// // @desc    Delete a regra
// // @params  RegraID
// // @access  private
router.delete(
  "/deleteRegra",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  RegraController.deleteRegra
);

// @route   UPDATE api/regra/updateRegra
// @desc    Update a regra
// @params  Regra ID, Descrição, Classificação, Tag, Pontuação
// @access  private
router.put(
  "/updateRegra",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  RegraController.updateRegra
);

module.exports = router;
