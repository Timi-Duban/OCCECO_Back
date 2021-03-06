const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
const accountController = require('../server/controllers/accountController');
const accountModel = require('../server/models/Account');

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
 * Account CRUD test suite.
 */
describe('account CRUD', () => {
    it('can be created', async () => {
        expect(async () => {
            await accountController.createAccount(basicAccount.accountMail, basicAccount.accountPassword, basicAccount.accountType);
        }).not.toThrow();
    });

    it('is well completed after being created', async () => {
        await accountController.createAccount(basicAccount.accountMail, basicAccount.accountPassword, basicAccount.accountType);
        const createdAccount = await accountModel.findOne();
        expect(createdAccount.accountMail).toBe(basicAccount.accountMail.toLowerCase());
        expect(createdAccount.accountPassword).toEqual(expect.anything());
        expect(createdAccount.accountType).toBe(basicAccount.accountType);
    });

    it('can get account by mail', async () => {
        await accountController.createAccount(basicAccount.accountMail, basicAccount.accountPassword, basicAccount.accountType);
        await accountController.createAccount(basicAccount2.accountMail, basicAccount2.accountPassword, basicAccount2.accountType);
        const searchedAccount = await accountController.getAccountByEmail(basicAccount.accountMail)
        expect(searchedAccount.accountMail).toBe(basicAccount.accountMail.toLowerCase());
        expect(searchedAccount.accountPassword).toEqual(expect.anything());
        expect(searchedAccount.accountType).toBe(basicAccount.accountType);
    });

    it('can get account by id', async () => {
        await accountController.createAccount(basicAccount.accountMail, basicAccount.accountPassword, basicAccount.accountType);
        await accountController.createAccount(basicAccount2.accountMail, basicAccount2.accountPassword, basicAccount2.accountType);
        const createdAccount = await accountModel.findOne({accountMail: basicAccount.accountMail.toLowerCase()});
        const searchedAccount = await accountController.getAccountById(createdAccount._id)
        expect(searchedAccount.accountMail).toBe(basicAccount.accountMail.toLowerCase());
        expect(searchedAccount.accountType).toBe(basicAccount.accountType);
        expect(searchedAccount.accountPassword).toEqual(expect.anything());
    });

    it('update password really put something else (and not void)', async () => {
        await accountController.createAccount(basicAccount.accountMail, basicAccount.accountPassword, basicAccount.accountType);
        var createdAccount = await accountModel.findOne();
        const oldPassword = createdAccount.accountPassword;
        await accountController.updatePassword(createdAccount._id, "newPassword")
        createdAccount = await accountModel.findOne();
        expect(createdAccount.accountMail).toBe(basicAccount.accountMail.toLowerCase());
        expect(createdAccount.accountPassword).toEqual(expect.anything());
        expect(createdAccount.accountPassword).not.toBe(oldPassword);
        expect(createdAccount.accountType).toBe(basicAccount.accountType);
    });

    it('can delete account', async () => {
        await accountController.createAccount(basicAccount.accountMail, basicAccount.accountPassword, basicAccount.accountType);
        const createdAccount = await accountModel.findOne();
        await accountController.deleteAccount(createdAccount._id)
        expect(await accountModel.findOne()).toBe(null)
    });

    it("update mail works", async () => {
        await accountController.createAccount(basicAccount.accountMail, basicAccount.accountPassword, basicAccount.accountType);
        var createdAccount = await accountModel.findOne();
        await accountController.updateMail(createdAccount._id, modificationsAccount.accountMail)
        createdAccount = await accountModel.findOne();
        expect(createdAccount.accountMail).toBe(modificationsAccount.accountMail);
    });

    it("update type works", async () => {
        await accountController.createAccount(basicAccount.accountMail, basicAccount.accountPassword, basicAccount.accountType);
        var createdAccount = await accountModel.findOne();
        await accountController.updateType(createdAccount._id, modificationsAccount.accountType)
        createdAccount = await accountModel.findOne();
        expect(createdAccount.accountType).toBe(modificationsAccount.accountType);
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

 const basicAccount2 = {
    accountMail: "accountMail2@mail.com",
    accountPassword: "accountPassword2Test",
    accountType: "partner"
 };

 const modificationsAccount = {
    accountMail: "mail@mail.com",
    accountPassword: "passwordTest",
    accountType: "partner"
 };