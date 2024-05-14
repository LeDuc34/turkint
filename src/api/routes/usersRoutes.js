// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/usersController');
const {loginUser} = require('../controllers/authController');
const {tokenVerification} = require('../controllers/verifyToken');

// Route for user signup
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verifyToken',tokenVerification)


module.exports  = router;
