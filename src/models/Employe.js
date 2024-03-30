const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Employe extends Model {}

Employe.init({
  EmployeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Nom: { type: DataTypes.STRING },
  Rôle: { type: DataTypes.STRING },
  Email: { type: DataTypes.STRING },
  Téléphone: { type: DataTypes.STRING }
}, { sequelize, modelName: 'Employe' });

module.exports = Employe;
