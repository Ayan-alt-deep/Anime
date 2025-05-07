const express = require('express');
const cors = require('cors');
const { animeData } = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Search Anime by Name
app.get('/search', (req, res) => {
  const query = req.query.anime.toLowerCase();
  const result = animeData.filter(anime => anime.name.toLowerCase().includes(query));

  if (result.length > 0) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'No anime found with that name.' });
  }
});

// Get Seasons of Anime
app.get('/seasons', (req, res) => {
  const { animeId } = req.query;
  const anime = animeData.find(a => a.id == animeId);

  if (anime) {
    res.json(anime.seasons);
  } else {
    res.status(404).json({ message: 'Anime not found.' });
  }
});

// Get Episodes of a Season
app.get('/episodes', (req, res) => {
  const { seasonId } = req.query;
  const season = animeData.flatMap(a => a.seasons).find(s => s.id == seasonId);

  if (season) {
    res.json(season.episodes);
  } else {
    res.status(404).json({ message: 'Season not found.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
