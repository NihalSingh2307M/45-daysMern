require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const profileRoutes = require('./routes/profile');
const searchRoutes = require('./routes/search');
const analyticsRoutes = require('./routes/analytics');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/api/profile', profileRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/analytics', analyticsRoutes);

// basic health
app.get('/', (req, res) => res.json({status: 'ok', now: new Date()}));

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/combined_api_db';

mongoose.connect(MONGO, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log('Server listening on', PORT));
  })
  .catch(err=>{
    console.error('MongoDB connection error:', err.message);
    // still start server for local dev even if DB not connected (so static endpoints work)
    app.listen(PORT, ()=> console.log('Server listening on', PORT, '- DB not connected'));
  });
