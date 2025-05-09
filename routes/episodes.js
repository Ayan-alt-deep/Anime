const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// ডাটা লোড ফাংশন
const loadEpisodes = (series) => {
  try {
    const dataPath = path.join(__dirname, '../data', `${series}.json`);
    return JSON.parse(fs.readFileSync(dataPath));
  } catch (error) {
    console.error(`Failed to load ${series} data:`, error);
    return null;
  }
};

// এপিসোড এন্ডপয়েন্ট
router.get('/:series/season/:season/episode/:episode', (req, res) => {
  const { series, season, episode } = req.params;
  const data = loadEpisodes(series);

  if (!data) {
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }

  const episodeData = data.episodes?.[`season${season}`]?.[`episode${episode}`];

  if (!episodeData?.url) {
    return res.status(404).json({
      success: false,
      error: 'Episode not found'
    });
  }

  res.json({
    success: true,
    data: episodeData
  });
});

module.exports = router;
