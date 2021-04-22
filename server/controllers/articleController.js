const Article = require('../models/Article');

const createArticle = async (articleTitle, articleLink,articleDescription) => {
    console.log(articleTitle)
    try {
        const article = new Article({
            articleTitle, articleLink,articleDescription, articleStartDate: new Date()
        });
        console.log(article);
        return await article.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
    
    console.log("articleController: createArticle OK")
    return
};

const deleteArticle = async () => {
    console.log("articleController: deleteArticle OK")
    return
}

const getAllArticles = async() => {
    try {
        const list = await Article.find()
        console.log(list)
        return list
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    createArticle,
    getAllArticles
}