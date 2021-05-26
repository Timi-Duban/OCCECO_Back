const ArticleController = require('../../../controllers/articleController');

module.exports = async (req, res) => {
    try {
        const article = await ArticleController.createArticle(req.body.newArticle)
        return res.status(200).json(article);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible de créer cet article"
        });
    }
};