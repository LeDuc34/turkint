const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydb', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Mettez true si vous souhaitez voir les requêtes SQL dans la console
});

module.exports = sequelize;

  
