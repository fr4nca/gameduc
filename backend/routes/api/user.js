const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkUserRole = require("../../utils/checkUserRole");

const UserController = require("../../controllers/userController");

// @route   POST api/user/register
// @desc    Login a user
// @returns JWT token
// @params  email, password
// @access  public
router.post("/register", UserController.register);

// @route   POST api/user/login
// @desc    Login a user
// @returns JWT token
// @params  email, password
// @access  public
router.post("/login", UserController.login);

// @route   GET api/user/current
// @desc    Returns the current user's profile
// @returns User's profile that's logged in
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  UserController.getProfile
);

// @route   GET api/user/getAlunos
// @desc    Returns all alunos
// @returns All alunos
// @access  private
router.get(
  "/getAlunos",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  UserController.getAlunos
);

// @route   DELETE api/user/deleteUser
// @desc    Delete a user
// @params  Matricula
// @access  private
router.delete(
  "/deleteUser",
  passport.authenticate("jwt", { session: false }),
  UserController.deleteUser
);

// @route   UPDATE api/user/updateUser
// @desc    Update a user
// @params  Matricula, nome, sobrenome, data de nascimento, graduação, curso, email, senha, papel
// @access  private
router.put(
  "/updateUser",
  passport.authenticate("jwt", { session: false }),
  UserController.updateUser
);

// @route   GET api/user/relatorioProfessor/:matricula
// @desc    Update a user
// @params  Matricula, nome, sobrenome, data de nascimento, graduação, curso, email, senha, papel
// @access  private
router.get(
  "/relatorioProfessor/:matricula",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  UserController.getRelatorioPainelProfessor
);

// @route   GET api/user/relatorioProfessor/:matricula
// @desc    Update a user
// @params  Matricula, nome, sobrenome, data de nascimento, graduação, curso, email, senha, papel
// @access  private
router.get(
  "/relatorioAluno/:matricula",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["aluno"]),
  UserController.getRelatorioPainelAluno
);

// @route   GET api/user/relatorioProfessor/:matricula
// @desc    Update a user
// @params  Matricula, nome, sobrenome, data de nascimento, graduação, curso, email, senha, papel
// @access  private
router.get(
  "/pontuacao/:matricula",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["aluno"]),
  UserController.getPontuacao
);

module.exports = router;
