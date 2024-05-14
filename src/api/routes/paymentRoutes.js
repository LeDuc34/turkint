// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {paymentIntent}= require('../controllers/paymentController');

router.post('/paymentIntent',paymentIntent)

module.exports  = router;