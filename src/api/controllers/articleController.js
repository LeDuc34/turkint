const Article = require('../../models/Article');

async function ajouterArticle() {
  try {
    const nouvelArticle = await Article.create({
      Nom: 'Kebab',
      Description: "stm; pain maison; ",
      Prix : 10 ,
      Catégorie : "Plat principal",
    });

    console.log('Article ajouté:', nouvelArticle.toJSON());
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un article:', error);
  }
}

module.exports = { ajouterArticle };
