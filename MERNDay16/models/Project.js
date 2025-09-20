const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  technologies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Technology'}],
  startDate: Date,
  endDate: Date,
  repoUrl: String,
  liveUrl: String,
  tags: [String],
}, {timestamps: true});

module.exports = mongoose.model('Project', ProjectSchema);
