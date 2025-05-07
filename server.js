const express = require("express");
const cors = require("cors");
const animeData = require("./animeData");

const app = express();
app.use(cors());

// GET /anime
app.get("/anime", (req, res) => {
  const list = animeData.map(a => ({ id: a.id, title: a.title }));
  res.json(list);
});

// GET /anime/:id/seasons
app.get("/anime/:id/seasons", (req, res) => {
  const anime = animeData.find(a => a.id === req.params.id);
  if (!anime) return res.status(404).json({ error: "Anime not found" });
  res.json(anime.seasons.map(s => ({ id: s.id, title: s.title })));
});

// GET /anime/:id/seasons/:sid/episodes
app.get("/anime/:id/seasons/:sid/episodes", (req, res) => {
  const anime = animeData.find(a => a.id === req.params.id);
  if (!anime) return res.status(404).json({ error: "Anime not found" });

  const season = anime.seasons.find(s => s.id === req.params.sid);
  if (!season) return res.status(404).json({ error: "Season not found" });

  res.json(season.episodes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));