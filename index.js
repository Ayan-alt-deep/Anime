const express = require('express');
const app = express();
const animeRouter = require('./routes/anime');

app.use('/api/anime', animeRouter);

app.get('/', (req, res) => {
  res.send('Anime API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
