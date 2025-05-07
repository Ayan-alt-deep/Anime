const express = require("express");
const cors = require("cors");

const animeRoutes = require("./routes/anime");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/anime", animeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Anime API running on port ${PORT}`));
