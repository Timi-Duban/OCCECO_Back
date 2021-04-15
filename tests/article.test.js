const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
const articleController = require('../server/controllers/articleController');
const articleModel = require('../server/models/article');

// Global settings
/**
 * Connect to a new in-memory database before running any tests.
 */
 // beforeAll(async () => await dbHandler.connect());

 /**
  * Clear all test data after every test.
  */
 // afterEach(async () => await dbHandler.clearDatabase());

 /**
  * Remove and close the db and server.
  */
 // afterAll(async () => await dbHandler.closeDatabase());
 

 /**
  * My test suite.
  */
 describe('article suite name', () => {
    it('test name', async () => {
        expect(2+2).toBe(4)
    });
 });
 
 /**
  * Article moked examples.
  */
 const basicArticle = {
 };

 const basicArticle2 = {
 };