const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Load episodes data
const episodesData = JSON.parse(fs.readFileSync('./api/naruto_episodes.json', 'utf8'));

// API Endpoint for fetching Naruto episodes
app.get('/api/naruto/:season/:episode', (req, res) => {
  const { season, episode } = req.params;
  const seasonData = episodesData[`season${season}`]; // Example: season1
  if (seasonData) {
    const episodeData = seasonData[`episode${episode}`]; // Example: episode1
    if (episodeData) {
      res.json(episodeData);
    } else {
      res.status(404).json({ error: `Episode ${episode} not found.` });
    }
  } else {
    res.status(404).json({ error: `Season ${season} not found.` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
