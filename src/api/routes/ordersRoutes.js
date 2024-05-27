// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { displayArchivedOrders,deleteOrder,updateTimer,getOrderInfos,takeOrder, displayOrdersProcessing,displayOrdersWaiting,updateStatus,displayOrdersReady } = require('../controllers/orderController');


router.post('/send',takeOrder)
router.get('/processing',displayOrdersProcessing)
router.get('/waiting',displayOrdersWaiting)
router.post('/update',updateStatus)
router.get('/ready',displayOrdersReady)
router.get('/getInfos',getOrderInfos)
router.post('/updateTimer',updateTimer)
router.post('/delete',deleteOrder)
router.get('/displayArchived',displayArchivedOrders)

module.exports  = router;
