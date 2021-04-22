const ArticleController = require('../../../controllers/articleController');

module.exports = async (req, res) => {
    try{
        console.log("getAllArticles route OK")
        const listeArticle = await ArticleController.getAllArticles(); 
        return res.status(200).json(listeArticle);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible d' avoir la liste des articles"
        });
    }
};