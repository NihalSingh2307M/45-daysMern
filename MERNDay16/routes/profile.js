const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/profileController');

router.get('/dashboard', profileCtrl.getDashboard);
router.get('/portfolio', profileCtrl.getPortfolio);

module.exports = router;
