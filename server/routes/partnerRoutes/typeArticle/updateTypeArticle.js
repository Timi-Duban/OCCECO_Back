const TypeArticleController = require('../../../controllers/typeArticleController');

module.exports = async (req, res) => {
    try{
        console.log("updateTypeArticle route OK")
        const typeArticle = await TypeArticleController.updateTypeArticle(req.body._id, req.body.nameType, req.body.iconType, req.body.colorType); 
        return res.status(200).json(typeArticle);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible de modifier cette catégorie d'article"
        });
    }
};