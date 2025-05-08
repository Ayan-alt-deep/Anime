const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Static Naruto JSON
const narutoData = JSON.parse(fs.readFileSync('./naruto_episodes.json', 'utf8'));

// Serve JSON API
app.get('/api/naruto', (req, res) => {
  res.json(narutoData);
});

// Video serving
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'videos/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) return res.status(400).send('No video uploaded');
  res.json({ url: `${req.protocol}://${req.get('host')}/videos/${req.file.filename}` });
});

app.listen(PORT, () => console.log(`Naruto API running on port ${PORT}`));
