const express = require('express');
const router = express.Router();
const analytics = require('../controllers/analyticsController');

router.get('/skills', analytics.skillsAnalytics);
router.get('/career', analytics.careerAnalytics);
router.get('/technology', analytics.technologyAnalytics);

module.exports = router;
