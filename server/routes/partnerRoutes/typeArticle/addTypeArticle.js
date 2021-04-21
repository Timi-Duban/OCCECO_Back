const TypeArticleController = require('../../../controllers/typeArticleController');

module.exports = async (req, res) => {
    try{
        console.log("addTypeArticle route OK")
        const typeArticle = await TypeArticleController.createTypeArticle(req.body.nameType); 
        return res.status(200).json(typeArticle);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible de créer cette catégorie d'article"
        });
    }
};