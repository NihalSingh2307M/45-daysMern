const Technology = require('../models/Technology');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const mongoose = require('mongoose');

exports.skillsAnalytics = async (req, res) => {
  try {
    // simple aggregation of skills across profiles
    const rows = await Profile.aggregate([
      { $unwind: '$skills' },
      { $group: { _id: '$skills', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    res.json(rows.map(r=> ({skill: r._id, count: r.count})));
  } catch(err){ console.error(err); res.status(500).json({error:'Server error'}); }
};

exports.careerAnalytics = async (req, res) => {
  try {
    // career progression: experiences per year
    const rows = await Experience.aggregate([
      { $project: { startYear: { $year: '$startDate' } } },
      { $group: { _id: '$startYear', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(rows.map(r=> ({year: r._id, count: r.count})));
  } catch(err){ console.error(err); res.status(500).json({error:'Server error'}); }
};

exports.technologyAnalytics = async (req, res) => {
  try {
    // top technologies by popularityScore and usage across projects
    const techs = await Technology.find({}).sort({popularityScore: -1}).limit(20).lean();
    const projectsUsing = await Project.aggregate([
      { $unwind: '$technologies' },
      { $group: { _id: '$technologies', count: { $sum: 1 } } }
    ]);
    const map = {};
    projectsUsing.forEach(p => { map[p._id.toString()] = p.count; });
    const out = techs.map(t => ({ name: t.name, popularityScore: t.popularityScore || 0, projectsUsing: map[t._id.toString()] || 0 }));
    res.json(out);
  } catch(err){ console.error(err); res.status(500).json({error:'Server error'}); }
};
