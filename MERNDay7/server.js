const express = require('express');
const app = express();


app.get('/api', (req, res) => {
  res.json({ "message": "API is running!" });
});


app.listen(3000, () => {
  console.log('Server is running on node server.js');
});