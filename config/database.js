const { Sequelize } = require('sequelize');

// Remplacez les placeholders par vos propres informations de connexion
const sequelize = new Sequelize('mydb', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Mettez true si vous souhaitez voir les requêtes SQL dans la console
});

module.exports = sequelize;


