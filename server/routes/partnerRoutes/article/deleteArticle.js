const ArticleController = require('../../../controllers/articleController');

module.exports = async (req, res) => {
    try{
        console.log("deleteArticle route OK")
        const article =  await ArticleController.deleteArticle(req.body._id);
        return res.status(200).json(article);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible de supprimer ce article"
        });
    }
};
