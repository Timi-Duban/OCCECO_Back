const ArticleController = require('../../../controllers/articleController');

module.exports = async (req, res) => {
    try{
        console.log("update Article route OK")
        console.log(req.body._id)
        const article = await ArticleController.updateArticle(req.body._id, req.body.articleTitle, req.body.articleLink, req.body.articleDescription)
        console.log("Apres controler avec google")
        console.log(article._id)
        console.log("controler")
        return res.status(200).json(article);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible d'update cet article"
        });
    }
};