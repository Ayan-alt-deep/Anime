const express = require('express');
const cors = require('cors');
const episodeRoutes = require('./routes/episodes');

const app = express();
const PORT = process.env.PORT || 3000;

// মিডলওয়্যার
app.use(cors());
app.use(express.json());

// রাউটস
app.use('/api', episodeRoutes);

// হেলথ চেক
app.get('/', (req, res) => {
  res.send('Naruto API is running!');
});

// এরর হ্যান্ডলিং
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// সার্ভার স্টার্ট
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
