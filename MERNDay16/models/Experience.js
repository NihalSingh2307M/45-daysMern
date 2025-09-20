const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  startDate: Date,
  endDate: Date,
  summary: String,
  technologies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Technology'}],
}, {timestamps: true});

module.exports = mongoose.model('Experience', ExperienceSchema);
