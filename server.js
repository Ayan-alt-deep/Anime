const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// JSON DB path
const dbPath = path.join(__dirname, 'naruto_episodes.json');

// Load DB
let narutoData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Multer storage for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const videoDir = path.join(__dirname, 'videos');
    if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir);
    cb(null, 'videos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// GET all episodes
app.get('/naruto', (req, res) => {
  res.json(narutoData);
});

// GET episode video
app.get('/naruto/:season/:episode', (req, res) => {
  const season = `season${req.params.season}`;
  const episode = `episode${req.params.episode}`;
  const video = narutoData[season]?.[episode];

  if (video) {
    res.json({
      season: req.params.season,
      episode: req.params.episode,
      videoUrl: video
    });
  } else {
    res.status(404).json({ error: "Episode not found" });
  }
});

// Upload new episode video
app.post('/upload/:season/:episode', upload.single('video'), (req, res) => {
  const season = `season${req.params.season}`;
  const episode = `episode${req.params.episode}`;

  if (!req.file) return res.status(400).json({ error: "No video uploaded" });

  // Update DB
  const videoUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;
  if (!narutoData[season]) narutoData[season] = {};
  narutoData[season][episode] = videoUrl;

  fs.writeFileSync(dbPath, JSON.stringify(narutoData, null, 2));
  res.json({ message: "Video uploaded", videoUrl });
});

app.listen(PORT, () => {
  console.log(`Naruto API running on http://localhost:${PORT}`);
});
