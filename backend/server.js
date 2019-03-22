const express = require("express");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");

const gamesRoutes = require("./routes/api/games");
const usersRoutes = require("./routes/api/users");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/games", gamesRoutes);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
