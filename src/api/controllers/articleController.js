const Article = require('../../models/Article');

async function ajouterArticle(nom, description,prix,categorie) {
  try {
    const nouvelArticle = await Article.create({
      Nom: nom,
      Description: description,
      Prix : prix,
      Catégorie : categorie,
    });

    console.log('Article ajouté:', nouvelArticle.toJSON());
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un article:', error);
  }
}

module.exports = { ajouterArticle };
