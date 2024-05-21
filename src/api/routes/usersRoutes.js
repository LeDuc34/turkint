// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {getUser,registerUser, displayUsers,updateRole,deleteUser,getRole } = require('../controllers/usersController');
const {loginUser} = require('../controllers/authController');
const {tokenVerification} = require('../controllers/verifyToken');

// Route for user signup
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verifyToken',tokenVerification)
router.get('/display',displayUsers)
router.post('/updateRole',updateRole)
router.post('/delete',deleteUser)
router.post('/getRole',getRole)
router.get('/getUser',getUser)


module.exports  = router;
