const Article = require('../models/Article');

const createArticle = async (articleTitle, articleLink,articleDescription, articleStartDate, articleEndDate) => {
    console.log(articleTitle)
    try {
        const article = new Article({
            articleTitle, articleLink,articleDescription, articleStartDate, articleEndDate
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

const deleteArticle = async (id) => {
    try{
        console.log("je suis bien rentré");
        await Article.deleteOne({_id:id})
        return {_id: id}
    }catch (error) {
        throw error;
    }
};

const getAllArticles = async() => {
    try {
        console.log("par ici je suis")
        const list = await Article.find()
        console.log(list)
        return list
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const updateArticle = async (_id,articleTitle, articleLink,articleDescription) => {
    console.log("je suis bien rentré dans le update");
    try {
        return await Article.findOneAndUpdate({_id},{articleTitle, articleLink,articleDescription, articleStartDate: new Date()},{new:true});
    } catch (error) {
        throw error;
    }
};

const getDailyArticles = async () => {
    return await Article.find()
}

module.exports = {
    createArticle,
    getAllArticles,
    deleteArticle,
    updateArticle,
    getDailyArticles
}