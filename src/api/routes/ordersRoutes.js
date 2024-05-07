// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { takeOrder } = require('../controllers/orderController');



router.post('/send',takeOrder)


module.exports  = router;
