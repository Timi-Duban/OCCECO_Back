const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
const accountController = require('../server/controllers/accountController');
const accountModel = require('../server/models/account');
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
  * User CRUD test suite.
  */
 describe('user CRUD', () => {
    it('can be created', async () => {
        expect(async () => {
            await accountController.createAccount(basicAccount.accountMail, basicAccount.accountPassword, basicAccount.accountType);
        }).not.toThrow();
    });

    it('is well completed after being created', async () => {
        await accountController.createAccount(basicAccount.accountMail, basicAccount.accountPassword, basicAccount.accountType);
        const createdAccount = await accountModel.findOne();
        const createdUser = await userModel.findOne();
        expect(createdUser.accountId).toStrictEqual(createdAccount._id);
    });
});

/**
 * Account moked examples.
 */
const basicAccount = {
   accountMail: "accountMail@mail.com",
   accountPassword: "accountPasswordTest",
   accountType: "client"
};