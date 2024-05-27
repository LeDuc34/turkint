const express = require('express');
const router = express.Router();
const {getCommandCount,getVegetableCount,getBreadCount,getSauceCount, getCommandCountByMonth } = require('../controllers/analyticsController');

router.get('/sauceCount', getSauceCount);
router.get('/breadCount', getBreadCount);
router.get('/vegetableCount', getVegetableCount);
router.get('/commandCount', getCommandCount)
router.get('/commandCountMonths',getCommandCountByMonth)


module.exports = router;