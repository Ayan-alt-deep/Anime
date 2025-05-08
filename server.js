
import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Load anime data
const animeData = JSON.parse(fs.readFileSync('./availableAnime.json'));
const videoData = JSON.parse(fs.readFileSync('./videoUrl.json'));

app.get('/', (req, res) => {
  res.send('Anime Hindi API is running');
});

app.get('/anime', (req, res) => {
  res.json(animeData);
});

app.get('/anime/:name', (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const anime = animeData.find(a => a.name.toLowerCase() === name.toLowerCase());
  if (!anime) return res.status(404).json({ error: 'Anime not found' });
  res.json(anime);
});

app.get('/video/:anime/:season/:episode', (req, res) => {
  const { anime, season, episode } = req.params;
  const video = videoData.find(v =>
    v.anime.toLowerCase() === anime.toLowerCase() &&
    v.season == season &&
    v.episode == episode
  );
  if (!video) return res.status(404).json({ error: 'Video not found' });
  res.json({ url: video.url });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
