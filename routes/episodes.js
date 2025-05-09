const express = require('express');
const router = express.Router();
const narutoData = require('../data/naruto.json');
const shippudenData = require('../data/shippuden.json');

// Get all seasons
router.get('/seasons/:series', (req, res) => {
  const { series } = req.params;
  const data = series === 'shippuden' ? shippudenData : narutoData;
  
  res.json({
    success: true,
    data: {
      metadata: data.metadata,
      seasons: Object.keys(data.episodes)
    }
  });
});

// Get episodes by season
router.get('/:series/season/:season', (req, res) => {
  const { series, season } = req.params;
  const data = series === 'shippuden' ? shippudenData : narutoData;
  
  if (!data.episodes[`season${season}`]) {
    return res.status(404).json({
      success: false,
      error: 'Season not found'
    });
  }

  res.json({
    success: true,
    data: {
      season: season,
      episodes: data.episodes[`season${season}`]
    }
  });
});

// Get specific episode
router.get('/:series/season/:season/episode/:episode', (req, res) => {
  const { series, season, episode } = req.params;
  const data = series === 'shippuden' ? shippudenData : narutoData;
  const seasonKey = `season${season}`;
  const episodeKey = `episode${episode}`;

  if (!data.episodes[seasonKey] || !data.episodes[seasonKey][episodeKey]) {
    return res.status(404).json({
      success: false,
      error: 'Episode not found'
    });
  }

  res.json({
    success: true,
    data: data.episodes[seasonKey][episodeKey]
  });
});

module.exports = router;
