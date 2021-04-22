const TypeArticleController = require('../../../controllers/typeArticleController');

module.exports = async (req, res) => {
    try{
        console.log("deleteTypeArticle route OK", req.body.id)
        const typeArticle = await TypeArticleController.deleteTypeArticle(req.body.id); 
        return res.status(200).json(typeArticle);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible de supprimer cette catégorie d'article"
        });
    }
};