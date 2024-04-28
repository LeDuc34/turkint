const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Basket extends Model {}

Basket.init({
    BasketID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ClientID: { type: DataTypes.INTEGER, references: { model: 'Clients', key: 'ClientID' }},
    Articles: { type: DataTypes.ARRAY(DataTypes.JSON) }, 
    TotalPrice: { type: DataTypes.FLOAT }
}, { sequelize, modelName: 'Basket' });

module.exports = Basket;