const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// if server running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// User routes
app.use('/api/users', userRoutes);

module.exports = app;
