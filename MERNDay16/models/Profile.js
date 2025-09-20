const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {type: String, required: true},
  headline: String,
  bio: String,
  location: String,
  skills: [{type: String}],
  technologies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Technology'}],
  projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
  experiences: [{type: mongoose.Schema.Types.ObjectId, ref: 'Experience'}],
}, {timestamps: true});

module.exports = mongoose.model('Profile', ProfileSchema);
