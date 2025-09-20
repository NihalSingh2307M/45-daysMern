const Profile = require('../models/Profile');

exports.getDashboard = async (req, res) => {
  try {
    // For demo: return profile plus quick aggregates (counts)
    const profile = await Profile.findOne({}).populate('projects experiences technologies').lean();
    if(!profile) return res.status(404).json({error: 'No profile found'});

    const dashboard = {
      name: profile.name,
      headline: profile.headline,
      counts: {
        projects: profile.projects ? profile.projects.length : 0,
        experiences: profile.experiences ? profile.experiences.length : 0,
        technologies: profile.technologies ? profile.technologies.length : 0,
        skills: profile.skills ? profile.skills.length : 0
      },
      topSkills: profile.skills ? profile.skills.slice(0,8) : [],
      recentProjects: (profile.projects || []).slice(0,5),
      recentExperiences: (profile.experiences || []).slice(0,5)
    };
    res.json(dashboard);
  } catch(err) {
    console.error(err);
    res.status(500).json({error: 'Server error'});
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const profile = await Profile.findOne({}).populate({
      path: 'projects experiences technologies',
      options: { sort: { createdAt: -1 } }
    }).lean();
    if(!profile) return res.status(404).json({error: 'No profile found'});
    res.json({
      profile: {
        name: profile.name,
        headline: profile.headline,
        bio: profile.bio,
        location: profile.location,
      },
      projects: profile.projects || [],
      experiences: profile.experiences || [],
      technologies: profile.technologies || []
    });
  } catch(err) {
    console.error(err);
    res.status(500).json({error: 'Server error'});
  }
};
