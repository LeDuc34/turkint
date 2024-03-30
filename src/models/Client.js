const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Ajustez le chemin selon votre structure de dossier

class Client extends Model {}

Client.init({
  ClientID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Nom: { type: DataTypes.STRING },
  Email: { type: DataTypes.STRING },
  Téléphone: { type: DataTypes.STRING },
  Adresse: { type: DataTypes.STRING }
}, { sequelize, modelName: 'Client' });

module.exports = Client;
