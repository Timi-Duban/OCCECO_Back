const ArticleController = require('../../../controllers/articleController');

module.exports = async (req, res) => {
    try{
        console.log("addArticle route OK")
        const article = await ArticleController.createArticle(req.body.name); //TODO: mettre les bons arguments
        return res.status(200).json(article);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible de créer cet article"
        });
    }
};