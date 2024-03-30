router.post('/connexion', async (req, res) => {
    try {
      const { email, motDePasse } = req.body;
      const client = await Client.findOne({ where: { Email: email } });
  
      if (!client || !await bcrypt.compare(motDePasse, client.MotDePasse)) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }
  
      // Connecter le client (vous pouvez utiliser des sessions ou des tokens JWT ici)
      res.status(200).json({ message: 'Connexion réussie' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  