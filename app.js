const express = require('express');
const cors = require('cors');
const episodeRoutes = require('./routes/episodes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/episodes', episodeRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Naruto API running on port ${PORT}`);
});
