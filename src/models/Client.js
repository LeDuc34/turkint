const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Ajustez le chemin selon votre structure de dossier

class Client extends Model {}

Client.init({
  ClientID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Username: { type: DataTypes.STRING, allowNull: true,unique: true},
  Email: { type: DataTypes.STRING, allowNull: false, unique: true },
  Password: { type: DataTypes.STRING, allowNull: false},
  Phone: { type: DataTypes.STRING },
  Adress: { type: DataTypes.STRING },
  Basket: { type: DataTypes.ARRAY(DataTypes.JSON) },
  Role : { type: DataTypes.STRING,allowNull: false, defaultValue: 'user' }
}, { sequelize, modelName: 'Client' });

module.exports = Client;
