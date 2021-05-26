const TypeArticleController = require('../../../controllers/typeArticleController');

module.exports = async (req, res) => {
    try{
        const typesArticle = await TypeArticleController.getAllTypes(); 
        return res.status(200).json(typesArticle);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible d' avoir la liste des catégories d'article"
        });
    }
};