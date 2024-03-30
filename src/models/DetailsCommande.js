const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class DetailsCommande extends Model {}

DetailsCommande.init({
  DetailCommandeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  CommandeID: { type: DataTypes.INTEGER, references: { model: 'Commandes', key: 'CommandeID' } },
  ArticleID: { type: DataTypes.INTEGER, references: { model: 'Articles', key: 'ArticleID' } },
  Quantité: { type: DataTypes.INTEGER },
  PrixUnitaire: { type: DataTypes.FLOAT }
}, { sequelize, modelName: 'DetailsCommande' });

module.exports = DetailsCommande;
