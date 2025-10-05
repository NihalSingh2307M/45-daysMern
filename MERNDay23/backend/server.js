const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT||5000;

app.use(cors());
app.use(express.json());

let projects =
[
    {
        id:1,
        title:"Portfolio Website",
        description:"A site to showcase my work"
    },
    {
        id:2,
        title:"E-commerce App",
        description:"An online store with MERN"
    },
    {
        id:3,
        title:"Gaming",
        description:"We love that don't we"
    }
];

// GET /API/Projects
app.get('/api/projects',(req,res) =>{
    res.json(projects)
});

//POST /api/projects
app.post('/api/projects',(req,res) =>{
    const{title,description} = req.body;
    if(!title || !description)
    {
        return res.status(400).json({error:'title &description required'})
    }

    const newProject = {id:Date.now(),title,description};
    projects.push(newProject);
    res.status(201).json(newProject);
});

app.get('/',(req,res) => res.send('app running'))


app.listen(PORT,() => console.log(`backend working port == http://localhost:${PORT}`));