const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Load episodes data
let episodesData;
try {
  const data = fs.readFileSync('./naruto_episodes.json', 'utf8');
  episodesData = JSON.parse(data);
} catch (err) {
  console.error('Error reading naruto_episodes.json:', err);
  episodesData = {};
}

// Route to get episode URL
app.get('/api/naruto/season/:season/episode/:episode', (req, res) => {
  const { season, episode } = req.params;
  const seasonKey = `season${season}`;
  const episodeKey = `episode${episode}`;

  if (
    episodesData[seasonKey] &&
    episodesData[seasonKey][episodeKey]
  ) {
    res.json({ url: episodesData[seasonKey][episodeKey] });
  } else {
    res.status(404).json({ error: 'Episode not found' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Naruto API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
