const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

let narutoData = {};

app.get('/', (req, res) => {
  res.send('✅ Naruto API is Live');
});

app.get('/naruto', async (req, res) => {
  try {
    if (!Object.keys(narutoData).length) {
      const response = await axios.get('https://raw.githubusercontent.com/Ayan-alt-deep/xyc/main/naruto_episodes.json');
      narutoData = response.data;
    }
    res.json(narutoData);
  } catch {
    res.status(500).json({ error: 'Failed to load Naruto data.' });
  }
});

app.get('/naruto/:season/:episode', async (req, res) => {
  const { season, episode } = req.params;
  try {
    if (!Object.keys(narutoData).length) {
      const response = await axios.get('https://raw.githubusercontent.com/Ayan-alt-deep/xyc/main/naruto_episodes.json');
      narutoData = response.data;
    }

    const seasonKey = `season${season}`;
    const episodeKey = `episode${episode}`;
    const videoUrl = narutoData[seasonKey]?.[episodeKey];

    if (!videoUrl) {
      return res.status(404).json({ error: 'Episode not found' });
    }

    res.json({ season, episode, videoUrl });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Naruto API running on port ${PORT}`);
});
