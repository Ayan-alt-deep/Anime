const express = require('express');
const cors = require('cors');
const animeRoutes = require('./routes/anime');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/anime', animeRoutes);

app.get('/', (req, res) => {
  res.send('Anime Hindi API Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});