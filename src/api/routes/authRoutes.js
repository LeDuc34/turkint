const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).send({ message: 'Login failed' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Login failed' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true }).sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
