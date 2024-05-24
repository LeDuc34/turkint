const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Commande extends Model {}

Commande.init({
  CommandeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ClientID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Clients',
      key: 'ClientID'
    }
  },
  DateHeureCommande: {
    type: DataTypes.DATE
  },
  Statut: {
    type: DataTypes.STRING
  },
  TotalCommande: {
    type: DataTypes.FLOAT
  },
  Details: {
    type: DataTypes.ARRAY(DataTypes.JSON)
  },
  Attente:{
    type: DataTypes.FLOAT
  },
  Payed:{
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize,
  modelName: 'Commande'
});

module.exports = Commande;
