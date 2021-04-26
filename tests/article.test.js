const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
const articleController = require('../server/controllers/articleController');
const articleModel = require('../server/models/Article');

// Global settings
/**
 * Connect to a new in-memory database before running any tests.
 */
 beforeAll(async () => await dbHandler.connect());

 /**
  * Clear all test data after every test.
  */
 afterEach(async () => await dbHandler.clearDatabase());

 /**
  * Remove and close the db and server.
  */
 afterAll(async () => await dbHandler.closeDatabase());
 

 /**
  * Article CRUD test suite.
  */
 describe('article CRUD', () => {
    it('can be created', async () => {
        expect(async () => {
            await articleController.createArticle(basicArticle.articleTitle, basicArticle.articleLink, basicArticle.articleDescription);
        }).not.toThrow();
    });

    // it('is well completed after being created', async () => {
    //     await articleController.createArticle();
    //     const createdArticle = await articleModel.findOne();
    //     expect(createdArticle.articleTitle).toBe(basicArticle.articleTitle);
    // });

    // it('can get article by id', async () => {
    //     await articleController.createArticle();
    //     await articleController.createArticle();
    //     const createdArticle = await articleModel.findOne({ articleTitle: basicArticle.articleTitle });
    //     const searchedArticle = await articleController.getArticleById(createdArticle._id)
    //     expect(searchedArticle.articleTitle).toBe(basicArticle.articleTitle);
    // });
    
    // it('can update article', async () => {
    //     await articleController.createArticle();
    //     const createdArticle = await articleModel.findOne();
    //     await articleController.updateArticle();
    //     const updatedArticle = await articleModel.findOne();
    //     expect(updatedArticle._id).toStrictEqual(createdArticle._id);
    //     expect(updatedArticle.articleTitle).toBe(basicArticle2.articleTitle);
    // });

    // it('can delete article', async () => {
    //     await articleController.createArticle();
    //     const createdArticle = await articleModel.findOne();
    //     await articleController.deleteArticle(createdArticle._id)
    //     expect(await articleModel.findOne()).toBe(null)
    // });
    
    
    // it('can get all articles', async () => {
    //     await articleController.createArticle();
    //     await articleController.createArticle();
    //     const allArticles = await articleController.getAllArticles();
    //     expect(allArticles.length).toBe(2)
    //     expect(allArticles[0].articleTitle).not.toBe(allArticles[1].articleTitle)
    // });
 });
 
 /**
  * Article moked examples.
  */
 const basicArticle = {
    articleTitle: "Title", 
    articleLink: "https://danstonchat.com",
    articleDescription: "Description"
 };

 const basicArticle2 = {
 };