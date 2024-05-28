// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {getOrderId,checkOngoingOrder,displayArchivedandCanceledOrders,Orders,deleteOrder,updateTimer,getOrderInfos,takeOrder, displayOrdersProcessing,displayOrdersWaiting,updateStatus,displayOrdersReady } = require('../controllers/orderController');


router.post('/send',takeOrder)
router.get('/processing',displayOrdersProcessing)
router.get('/waiting',displayOrdersWaiting)
router.post('/update',updateStatus)
router.get('/ready',displayOrdersReady)
router.get('/getInfos',getOrderInfos)
router.post('/updateTimer',updateTimer)
router.post('/delete',deleteOrder)
router.get('/displayArchivedCanceled',displayArchivedandCanceledOrders)
router.get('/current',checkOngoingOrder)
router.get('/getOrderID',getOrderId)

module.exports  = router;
