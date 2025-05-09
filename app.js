require('dotenv').config(); // Add this line
const express = require('express');
const cors = require('cors');
const path = require('path');
const episodeRoutes = require('./routes/episodes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/episodes', episodeRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Naruto API is running');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
