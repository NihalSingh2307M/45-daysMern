require('dotenv').config();
const mongoose = require('mongoose');

const Profile = require('./models/Profile');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Technology = require('./models/Technology');

async function seed() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/combined_api_db');
    console.log('Connected to MongoDB');

  
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Technology.deleteMany({});
    console.log('Cleared old data');

   
    const node = new Technology({ name: 'Node.js', category: 'Backend' });
    const react = new Technology({ name: 'React', category: 'Frontend' });
    const mongo = new Technology({ name: 'MongoDB', category: 'Database' });

    await node.save();
    await react.save();
    await mongo.save();
    console.log('Added technologies');

    
    const project1 = new Project({
      title: 'Portfolio Website',
      description: 'My personal portfolio',
      technologies: [node._id, react._id]
    });

    const project2 = new Project({
      title: 'API Server',
      description: 'A simple Node.js API',
      technologies: [node._id, mongo._id]
    });

    await project1.save();
    await project2.save();
    console.log('Added projects');

    
    const experience1 = new Experience({
      company: 'Tech Corp',
      position: 'Junior Developer',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-12-31'),
      technologies: [node._id]
    });

    const experience2 = new Experience({
      company: 'Web Labs',
      position: 'Frontend Developer',
      startDate: new Date('2023-01-01'),
      technologies: [react._id]
    });

    await experience1.save();
    await experience2.save();
    console.log('Added experiences');

    
    const profile = new Profile({
      name: 'John Doe',
      headline: 'Fullstack Developer',
      bio: 'I love building web applications',
      skills: ['JavaScript', 'Node.js', 'React'],
      technologies: [node._id, react._id, mongo._id],
      projects: [project1._id, project2._id],
      experiences: [experience1._id, experience2._id]
    });

    await profile.save();
    console.log('Added profile');

    console.log('Seeding complete!');
    process.exit(0);

  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seed();
