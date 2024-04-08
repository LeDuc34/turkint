// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/usersController');

// Route for user signup
router.post('/register', registerUser);

module.exports = router;
