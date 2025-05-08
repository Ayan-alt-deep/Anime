const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

// Path to the local JSON file
const narutoDataPath = path.join(__dirname, 'data', 'naruto_episodes.json');

// Function to load episode data from the local JSON file
const loadNarutoEpisodes = () => {
  try {
    const data = fs.readFileSync(narutoDataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading or parsing naruto_episodes.json:', error);
    return null;
  }
};

// Main Naruto route
app.get('/naruto', (req, res) => {
  const { season, episode } = req.query;

  if (!season || !episode) {
    return res.status(400).json({ error: "Missing season or episode parameter" });
  }

  const narutoEpisodes = loadNarutoEpisodes();
  if (!narutoEpisodes) {
    return res.status(500).json({ error: "Failed to load episode data" });
  }

  const videoUrl = narutoEpisodes?.[season]?.[episode];
  if (!videoUrl) {
    return res.status(404).json({ error: `Episode not found: ${season}E${episode}` });
  }

  return res.redirect(videoUrl);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Naruto API is running on port ${PORT}`);
});
