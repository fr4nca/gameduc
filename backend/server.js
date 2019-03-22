const express = require("express");
require("dotenv").config();

const gamesRoutes = require("./routes/api/games");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/games", gamesRoutes);

const PORT = 5000 | process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
