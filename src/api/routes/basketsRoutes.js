const express = require('express');
const router = express.Router();
const { addToBasket, displayBasket,clearBasket,updateBasket } = require('../controllers/basketController');

router.post('/add',addToBasket);
router.get('/display',displayBasket)
router.get('/clear',clearBasket)
router.post('/update',updateBasket)

module.exports  = router;