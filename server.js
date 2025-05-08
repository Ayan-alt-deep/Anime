const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve video files
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// Read Naruto JSON
const narutoData = JSON.parse(fs.readFileSync('./naruto_episodes.json', 'utf8'));
app.get('/api/naruto', (req, res) => res.json(narutoData));

// Upload setup
const storage = multer.diskStorage({
  destination: 'videos/',
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  const url = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;
  res.json({ success: true, url });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));