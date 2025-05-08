const express = require('express');
const app = express();
const narutoRoute = require('./routes/naruto');
const cors = require('cors');

app.use(cors());
app.use('/api/naruto', narutoRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));