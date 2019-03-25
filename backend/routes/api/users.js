const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkUserRole = require("../../utils/checkUserRole");

const UserController = require("../../controllers/userController");

// @route   POST api/users/register
// @desc    Login a user
// @returns JWT token
// @params  email, password
// @access  public
router.post("/register", UserController.register);

// @route   POST api/users/login
// @desc    Login a user
// @returns JWT token
// @params  email, password
// @access  public
router.post("/login", UserController.login);

// @route   GET api/users/current
// @desc    Returns the current user's profile
// @returns User's profile that's logged in
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  UserController.getProfile
);

// @route   GET api/users/getAlunos
// @desc    Returns all alunos
// @returns All alunos
// @access  private
router.get(
  "/getAlunos",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  UserController.getAlunos
);

module.exports = router;
