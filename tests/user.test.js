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
  * User CRUD test suite.
  */
 describe('user CRUD', () => {
    it('can be created', async () => {
        expect(async () => {
            await userController.createUser(basicUser.userMail, basicUser.userPassword, basicUser.userType);
        }).not.toThrow();
    });

    it('is well completed after being created', async () => {
        await userController.createUser(basicUser.userMail, basicUser.userPassword, basicUser.userType);
        const createdUser = await userModel.findOne();
        expect(createdUser.userMail).toBe(basicUser.userMail.toLowerCase());
        expect(createdUser.userPassword).toEqual(expect.anything());
        expect(createdUser.userType).toBe(basicUser.userType);
    });

    it('can get user by mail', async () => {
        await userController.createUser(basicUser.userMail, basicUser.userPassword, basicUser.userType);
        await userController.createUser(basicUser2.userMail, basicUser2.userPassword, basicUser2.userType);
        const searchedUser = await userController.getUserByEmail(basicUser.userMail)
        expect(searchedUser.userMail).toBe(basicUser.userMail.toLowerCase());
        expect(searchedUser.userPassword).toEqual(expect.anything());
        expect(searchedUser.userType).toBe(basicUser.userType);
    });

    it('can get user by id', async () => {
        await userController.createUser(basicUser.userMail, basicUser.userPassword, basicUser.userType);
        await userController.createUser(basicUser2.userMail, basicUser2.userPassword, basicUser2.userType);
        const createdUser = await userModel.findOne({userMail: basicUser.userMail.toLowerCase()});
        const searchedUser = await userController.getUserById(createdUser._id)
        expect(searchedUser.userMail).toBe(basicUser.userMail.toLowerCase());
        expect(searchedUser.userType).toBe(basicUser.userType);
        // No password because we don't return it when we search by Id
    });

    it('update password really put something and not void', async () => {
        await userController.createUser(basicUser.userMail, basicUser.userPassword, basicUser.userType);
        const createdUser = await userModel.findOne();
        await userController.updatePassword(createdUser._id, "newPassword")
        expect(createdUser.userMail).toBe(basicUser.userMail.toLowerCase());
        expect(createdUser.userPassword).toEqual(expect.anything());
        expect(createdUser.userType).toBe(basicUser.userType);
    });

    it('can delete user', async () => {
        await userController.createUser(basicUser.userMail, basicUser.userPassword, basicUser.userType);
        const createdUser = await userModel.findOne();
        await userController.deleteUser(createdUser._id)
        expect(await userModel.findOne()).toBe(null)
    });
 });
 
 /**
  * User moked examples.
  */
 const basicUser = {
    userMail: "userMail@mail.com",
    userPassword: "userPasswordouaisouais",
    userType: "client"
 };

 const basicUser2 = {
    userMail: "userMail2@mail.com",
    userPassword: "userPasswor2douaisouais",
    userType: "partner"
 };
