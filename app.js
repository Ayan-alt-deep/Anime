// app.js (মূল ফাইল)
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// JSON ডাটা লোড (MongoDB ছাড়া)
const loadData = (series) => {
  try {
    const filePath = path.join(__dirname, 'data', `${series}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(`Error loading ${series}.json:`, e);
    return null;
  }
};

// রাউট: সকল সিজন
app.get('/api/:series/seasons', (req, res) => {
  const { series } = req.params;
  const data = loadData(series);
  
  if (!data) return res.status(404).json({ error: 'Series not found' });

  res.json({
    success: true,
    seasons: Object.keys(data.episodes).map(s => s.replace('season', ''))
  });
});

// রাউট: নির্দিষ্ট এপিসোড
app.get('/api/:series/season/:season/episode/:episode', (req, res) => {
  const { series, season, episode } = req.params;
  const data = loadData(series);
  const seasonKey = `season${season}`;
  const episodeKey = `episode${episode}`;

  if (!data?.episodes?.[seasonKey]?.[episodeKey]) {
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

// হেলথ চেক
app.get('/health', (req, res) => {
  res.json({ status: 'active', timestamp: new Date() });
});

// সার্ভার শুরু
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
