// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/usersController');
const {loginUser} = require('../controllers/authController');
//const {commandeUser} = require('../controllers/commandeRequestController');
const {tokenVerification} = require('../controllers/verifyToken');
const {addToBasket} = require('../controllers/basketController');

// Route for user signup
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verifyToken',tokenVerification)
router.post('/addTobasket',addToBasket);

module.exports  = router;
