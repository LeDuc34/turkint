const express = require('express');
const router = express.Router();
const { addToBasket, displayBasket,clearBasket } = require('../controllers/basketController');

router.post('/add',addToBasket);
router.get('/display',displayBasket)
router.get('/clear',clearBasket)

module.exports  = router;