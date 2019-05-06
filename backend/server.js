const express = require("express");
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
const cors = require("cors");
const passport = require("passport");

const userRoutes = require("./routes/api/user");
const gameRoutes = require("./routes/api/game");
const disciplinaRoutes = require("./routes/api/disciplina");
const regraRoutes = require("./routes/api/regra");
const tarefaRoutes = require("./routes/api/tarefa");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/user", userRoutes);
app.use("/game", gameRoutes);
app.use("/disciplina", disciplinaRoutes);
app.use("/regra", regraRoutes);
app.use("/tarefa", tarefaRoutes);

app.use("/", (req, res) => {
  res.status(404).send("Route not found");
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
