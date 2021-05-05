const Article = require('../models/Article');

const createArticle = async (articleTitle, articleLink,articleDescription, articleStartDate, articleEndDate, articleCategories) => {
    console.log("articleController: createArticle OK")
    try {
        const article = new Article({
            articleTitle, articleLink,articleDescription, articleStartDate, articleEndDate, articleCategories
        });
        console.log(article);
        return (await article.save()).populate('articleCategories');
    } catch (error) {
        console.log(error);
        throw error;
    }
    
    
    return
};

const deleteArticle = async (id) => {
    try{
        await Article.deleteOne({_id:id})
        return {_id: id}
    }catch (error) {
        throw error;
    }
};

const getAllArticles = async() => {
    try {
        const list = await Article.find().populate('articleCategories')
        return list
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const updateArticle = async (_id, articleTitle, articleLink,articleDescription, articleStartDate, articleEndDate, articleCategories) => {
    
    try {
        return (await Article.findOneAndUpdate({_id},{ articleTitle, articleLink,articleDescription, articleStartDate, articleEndDate, articleCategories},{new:true})).populate('articleCategories');
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