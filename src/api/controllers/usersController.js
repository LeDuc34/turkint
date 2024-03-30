const express = require('express');
const bcrypt = require('bcrypt');
const Client = require('../models/Client');
const router = express.Router();

router.post('/inscription', async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;
    const motDePasseHache = await bcrypt.hash(motDePasse, 10);

    const client = await Client.create({
      Nom: nom,
      Email: email,
      MotDePasse: motDePasseHache
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
