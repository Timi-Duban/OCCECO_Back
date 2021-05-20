const ArticleController = require('../../../controllers/articleController');

module.exports = async (req, res) => {
    try{
        console.log("update Article route OK", req.body)
        const article = await ArticleController.updateArticle(req.body._id, req.body.articleTitle, req.body.articleLink, req.body.articleDescription, req.body.articleStartDate, req.body.articleEndDate, req.body.articleCategories, req.body.articleDateEvent, req.body.isEvent)
       
        return res.status(200).json(article);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible d'update cet article"
        });
    }
};