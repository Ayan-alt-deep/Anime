const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const loadAnimeData = () => {
  const animeFolder = path.join(__dirname, '..', 'data');
  const files = fs.readdirSync(animeFolder);
  return files.map(file => require(path.join(animeFolder, file)));
};

const animeList = loadAnimeData();

router.get('/search', (req, res) => {
  res.json(animeList.map(({ id, title }) => ({ id, title })));
});

router.get('/seasons/:animeId', (req, res) => {
  const anime = animeList.find(a => a.id === req.params.animeId);
  if (!anime) return res.status(404).json({ error: "Anime not found" });
  res.json(anime.seasons);
});

router.get('/episodes/:seasonId', (req, res) => {
  for (const anime of animeList) {
    for (const season of anime.seasons) {
      if (season.id === req.params.seasonId)
        return res.json(season.episodes);
    }
  }
  res.status(404).json({ error: "Season not found" });
});

module.exports = router;
