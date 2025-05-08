const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/:title/:season/:episode', (req, res) => {
  const { title, season, episode } = req.params;
  const filePath = path.join(__dirname, '..', 'data', `${title.toLowerCase()}_episodes.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `Anime '${title}' not found` });
  }

  try {
    const animeData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const seasonKey = `season${season}`;
    const episodeKey = `episode${episode}`;

    if (!animeData[seasonKey] || !animeData[seasonKey][episodeKey]) {
      return res.status(404).json({ error: `Episode not found for ${title} S${season}E${episode}` });
    }

    res.json(animeData[seasonKey][episodeKey]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load anime data' });
  }
});

module.exports = router;
