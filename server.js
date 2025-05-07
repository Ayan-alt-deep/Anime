const express = require('express');
const app = express();
const animeRoutes = require('./routes/anime');

app.use('/api/anime', animeRoutes);
app.get('/', (req, res) => res.send("AnimeHindi API Running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
