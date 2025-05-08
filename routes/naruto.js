const express = require('express');
const router = express.Router();
const narutoData = require('../data/naruto_episodes.json');

router.get('/:season/:episode', (req, res) => {
  const { season, episode } = req.params;
  const seasonKey = `season${season}`;
  const episodeKey = `episode${episode}`;

  if (!narutoData[seasonKey] || !narutoData[seasonKey][episodeKey]) {
    return res.status(404).json({ error: 'Episode not found' });
  }

  res.json(narutoData[seasonKey][episodeKey]);
});

module.exports = router;
