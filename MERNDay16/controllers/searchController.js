const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Technology = require('../models/Technology');
const mongoose = require('mongoose');

function buildRegex(q) {
  if(!q) return null;
  return new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

exports.crossResourceSearch = async (req, res) => {
  try {
    const { q, type, tags, tech } = req.query;
    const regex = buildRegex(q);

    const promises = [];

    if(!type || type === 'profile') {
      promises.push(Profile.find(
        q ? { $or: [{ name: regex }, { headline: regex }, { bio: regex }, { skills: regex }] } : {}
      ).lean());
    }
    if(!type || type === 'project') {
      const filter = q ? { $or: [{ title: regex }, { description: regex }, { tags: regex }] } : {};
      if(tech && mongoose.Types.ObjectId.isValid(tech)) filter.technologies = tech;
      promises.push(Project.find(filter).lean());
    }
    if(!type || type === 'experience') {
      promises.push(Experience.find(q ? { $or: [{ company: regex }, { position: regex }, { summary: regex }] } : {}).lean());
    }
    if(!type || type === 'technology') {
      promises.push(Technology.find(q ? { $or: [{ name: regex }, { tags: regex }, { category: regex }] } : {}).lean());
    }

    const [profiles = [], projects = [], experiences = [], technologies = []] = await Promise.all(promises);

    // Very simple relevance ranking: match count on fields (demo)
    const scoreItem = (item, fields) => {
      if(!q) return 0;
      const lq = q.toLowerCase();
      return fields.reduce((s,f)=>{
        const v = (item[f] || '').toString().toLowerCase();
        return s + (v.includes(lq) ? 1 : 0);
      }, 0);
    };

    const results = [
      ...profiles.map(p => ({type: 'profile', score: scoreItem(p, ['name','headline','bio']), item: p})),
      ...projects.map(p => ({type: 'project', score: scoreItem(p, ['title','description']), item: p})),
      ...experiences.map(e => ({type: 'experience', score: scoreItem(e, ['company','position','summary']), item: e})),
      ...technologies.map(t => ({type: 'technology', score: scoreItem(t, ['name','category']), item: t})),
    ];

    // sort by score desc then type
    results.sort((a,b)=> b.score - a.score);
    res.json({count: results.length, results});
  } catch(err) {
    console.error(err);
    res.status(500).json({error: 'Server error'});
  }
};
