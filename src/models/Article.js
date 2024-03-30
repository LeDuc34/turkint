const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Article extends Model {}

Article.init({
  ArticleID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Nom: { type: DataTypes.STRING },
  Description: { type: DataTypes.TEXT },
  Prix: { type: DataTypes.FLOAT },
  Catégorie: { type: DataTypes.STRING }
}, { sequelize, modelName: 'Article' });

module.exports = Article;
