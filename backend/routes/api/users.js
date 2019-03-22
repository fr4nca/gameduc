const express = require("express");
const router = express.Router();

const passport = require("passport");

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
// @desc    Returns the current user
// @returns Current user
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  UserController.getCurrentProfile
);

module.exports = router;
