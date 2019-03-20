const express = require("express");

const gamesRoutes = require("./routes/api/games");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/games", gamesRoutes);

const PORT = 5000 | process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
