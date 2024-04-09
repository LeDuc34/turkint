// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/usersController');
const {loginUser} = require('../controllers/authController');

// Route for user signup
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
