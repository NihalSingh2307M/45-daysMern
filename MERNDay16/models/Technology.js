const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  category: String,
  popularityScore: {type: Number, default: 0},
  tags: [String]
}, {timestamps: true});

module.exports = mongoose.model('Technology', TechnologySchema);
