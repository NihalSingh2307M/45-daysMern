const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json()); 

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);
const dbName = 'mydatabase';

async function main() {
  await client.connect();
  console.log(' Connected to MongoDB');

  const db = client.db(dbName);
  const projects = db.collection('projects');

 
  app.post('/api/projects', async (req, res) => {
    try {
      const data = req.body; 
      const result = await projects.insertOne(data); 
      res.status(201).json({ insertedId: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create project' });
    }
  });

  app.get('/api/projects', async (req, res) => {
    try {
      const allProjects = await projects.find().toArray();
      res.json(allProjects);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  app.listen(3000, () => console.log(' Server running at http://localhost:3000'));
}

main();
