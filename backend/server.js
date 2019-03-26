const express = require("express");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");

const userRoutes = require("./routes/api/user");
const gameRoutes = require("./routes/api/game");
const disciplinaRoutes = require("./routes/api/disciplina");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/disciplina", disciplinaRoutes);

app.use("/", (req, res) => {
  res.status(404).send("Route not found");
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
