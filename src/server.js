const express = require('express');
const next = require('next');
const sequelize = require('../config/database.js'); 
const { ajouterArticle } = require('./api/controllers/articleController.js');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

//creation des tables
const Client = require('./models/Client.js');
const Article = require('./models/Article.js');
const Commande = require('./models/Commande.js');
const DetailsCommande = require('./models/DetailsCommande.js');
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données PostgreSQL réussie.');

    // Création des tables en respectant l'ordre des dépendances
    await Client.sync();
    await Article.sync();
    await Commande.sync();
    await DetailsCommande.sync(); // Dépend des tables Article et Commande
    
    console.log('Les tables ont été créées');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
})();

ajouterArticle();

  // Définir des routes API personnalisées
  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello World' });
  });

  // Gestion de toutes les autres requêtes par Next.js
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Prêt sur http://localhost:${port}`);
  });
});
