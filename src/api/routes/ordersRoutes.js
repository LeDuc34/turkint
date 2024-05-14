// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { takeOrder, displayOrdersProcessing,displayOrdersWaiting,updateStatus,displayOrdersReady } = require('../controllers/orderController');


router.post('/send',takeOrder)
router.get('/processing',displayOrdersProcessing)
router.get('/waiting',displayOrdersWaiting)
router.post('/update',updateStatus)
router.get('/ready',displayOrdersReady)

module.exports  = router;
