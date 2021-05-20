const Article = require('../models/Article');

const createArticle = async (articleTitle, articleLink,articleDescription, articleStartDate, articleEndDate, articleCategories, articleDateEvent, isEvent) => {
    console.log(articleTitle)
    try {
        const article = new Article({
            articleTitle, articleLink,articleDescription, articleStartDate, articleEndDate, articleCategories, articleDateEvent, isEvent
        });
        console.log(article);
        const articleCreated = (await article.save()).populate('articleCategories')
        await linkUserWithArticle(articleCreated);
        return (articleCreated);
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

const updateArticle = async (_id,articleTitle, articleLink, articleDescription, articleStartDate, articleEndDate, articleCategories, articleDateEvent, isEvent) => {
    console.log("je suis bien rentré dans le update");
    try {
        const articleUpdated = await Article.findOneAndUpdate({_id},{articleTitle, articleLink, articleDescription, articleStartDate, articleEndDate, articleCategories, articleDateEvent, isEvent},{new:true}).populate('articleCategories');
        await linkUserWithArticle(articleUpdated);
        return (articleUpdated); 
    } catch (error) {
        throw error;
    }
};

const getDailyArticles = async () => {
    return await Article.find().populate('articleCategories')
}

const linkUserWithArticle = async (article) => {
    await User
    .find({userCategories: {$in : article.articleCategories }})
    .then(articles => {
        articles.forEach(user => {
            user.userArticlesLinked.push({articleId: article._id, isOpen: false})
            user.save()
        })
    })
}

module.exports = {
    createArticle,
    getAllArticles,
    deleteArticle,
    updateArticle,
    getDailyArticles
}