// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/usersController');
const {loginUser} = require('../controllers/authController');
const {commandeUser} = require('../controllers/commandeController');
const {tokenVerification} = require('../controllers/verifyToken');

// Route for user signup
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verifyToken',tokenVerification)
//router.post('/commande',commandeUser);

module.exports  = router;
