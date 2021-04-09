const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const userController = require('../server/controllers/userController');
const userModel = require('../server/models/user');

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
  * User test suite.
  */
 describe('product ', () => {
    it('can be created correctly', async () => {
        expect(async () => {
            await userController.createUser(userComplete.userMail, userComplete.userPassword, userComplete.userType);
        })
            .not
            .toThrow();
    });

    it('exists after being created', async () => {
        await userController.createUser(userComplete.userMail, userComplete.userPassword, userComplete.userType);

        const createdUser = await userModel.findOne();

        expect(createdUser.userMail)
            .toBe(userComplete.userMail.toLowerCase());
    });

 });
 
 /**
  * Complete user example.
  */
 const userComplete = {
    userMail: 'userMail@mail.com',
    userPassword: "userPasswordouaisouais",
    userType: "client"
 };