const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
const typeArticleController = require('../server/controllers/typeArticleController');
const typeArticleModel = require('../server/models/TypeArticle');

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
            await typeArticleController.createTypeArticle(basicTypeArticle.nameType, basicTypeArticle.iconType, basicTypeArticle.colorType);
        }).not.toThrow();
    });

    it('is well completed after being created', async () => {
        await typeArticleController.createTypeArticle(basicTypeArticle.nameType, basicTypeArticle.iconType, basicTypeArticle.colorType);
        const createdTypeArticle = await typeArticleModel.findOne();
        expect(createdTypeArticle.nameType).toBe(basicTypeArticle.nameType);
        expect(createdTypeArticle.iconType).toBe(basicTypeArticle.iconType);
        expect(createdTypeArticle.colorType).toBe(basicTypeArticle.colorType);
    });

    it('can get typeArticle by id', async () => {
        await typeArticleController.createTypeArticle(basicTypeArticle.nameType, basicTypeArticle.iconType, basicTypeArticle.colorType);
        await typeArticleController.createTypeArticle(basicTypeArticle2.nameType, basicTypeArticle2.iconType, basicTypeArticle2.colorType);
        const createdTypeArticle = await typeArticleModel.findOne({ nameType: basicTypeArticle.nameType });
        const searchedTypeArticle = await typeArticleController.getTypeById(createdTypeArticle._id)
        expect(searchedTypeArticle.nameType).toBe(basicTypeArticle.nameType);
        expect(searchedTypeArticle.iconType).toBe(basicTypeArticle.iconType);
        expect(searchedTypeArticle.colorType).toBe(basicTypeArticle.colorType);
    });
    
    it('can update typeArticle', async () => {
        await typeArticleController.createTypeArticle(basicTypeArticle.nameType, basicTypeArticle.iconType, basicTypeArticle.colorType);
        const createdType = await typeArticleModel.findOne();
        await typeArticleController.updateTypeArticle(createdType._id, basicTypeArticle2.nameType, basicTypeArticle.iconType, basicTypeArticle2.colorType);
        const updatedType = await typeArticleModel.findOne();
        expect(updatedType._id).toStrictEqual(createdType._id);
        expect(updatedType.nameType).toBe(basicTypeArticle2.nameType);
        expect(updatedType.iconType).toBe(basicTypeArticle.iconType);
        expect(updatedType.iconType).toBe(createdType.iconType);
        expect(updatedType.colorType).toBe(basicTypeArticle2.colorType);
    });

    it('can delete typeArticle', async () => {
        await typeArticleController.createTypeArticle(basicTypeArticle.nameType, basicTypeArticle.iconType, basicTypeArticle.colorType);
        const createdType = await typeArticleModel.findOne();
        await typeArticleController.deleteTypeArticle(createdType._id)
        expect(await typeArticleModel.findOne()).toBe(null)
    });
    
    
    it('can get all typeArticle', async () => {
        await typeArticleController.createTypeArticle(basicTypeArticle.nameType, basicTypeArticle.iconType, basicTypeArticle.colorType);
        await typeArticleController.createTypeArticle(basicTypeArticle2.nameType, basicTypeArticle2.iconType, basicTypeArticle2.colorType);
        const allTypeArticles = await typeArticleController.getAllTypes();
        expect(allTypeArticles.length).toBe(2)
        expect(allTypeArticles[0].nameType).not.toBe(allTypeArticles[1].nameType)
    });
    
});

/**
 * Article moked examples.
 */
const basicTypeArticle = {
    nameType: "typeArticle1",
    iconType: "iconType1",
    colorType: "red"
};
const basicTypeArticle2 = {
    nameType: "typeArticle2",
    iconType: "iconType2",
    colorType: "blue"
};