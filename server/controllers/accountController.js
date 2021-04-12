const Account = require('../models/Account');
const User = require('../models/User');
const passwordEncryption = require('../encryption/passwordEncryption');
const userController = require('./userController');

/**
 * @param {mongoose.ObjectId} _id 
 * @returns {Account} Account infos except password
 */
const getAccountById = async(_id) => {
    try {
        return await Account.findById(_id).select('-accountPassword')
    } catch (error) {
        console.log(error)
        throw error;
    }
};

/**
 * @param {String} accountMail 
 * @returns {Account} Account infos
 */
const getAccountByEmail = async(accountMail) => {
    try {
        const accountMailLowerCased = accountMail.toLowerCase()
        return await Account.findOne({accountMail: accountMailLowerCased});
    } catch(error) {
        throw error;
    }
};

/**
 * @param {String} accountMail 
 * @param {String} accountPassword 
 * @param {String} accountType 
 * @returns {Account} Account infos
 */
const createAccount = async (accountMail, accountPassword, accountType) => {
    const hashedPassword = await passwordEncryption.passwordEncryption(accountPassword);
    try {
        const accountMailLowerCased = accountMail.toLowerCase()
        const account = new Account({accountMail: accountMailLowerCased, accountPassword: hashedPassword, accountType
        });
        await account.save()
        try{
            const user = new User({accountId: account._id})
            return await user.save();
        } catch (error) {
            console.log("error while creating user linked to an account");
        }
    } catch (error) {
        console.log("error while creating account")
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} _id 
 * @param {String} accountPassword 
 * @returns {Account} updated Account infos
 */
const updatePassword = async (_id,accountPassword) => {
    try {
        const hashedPassword = await passwordEncryption.passwordEncryption(accountPassword);
        return await Account.findOneAndUpdate({_id},{accountPassword:hashedPassword},{new:true});
    } catch (error) {
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} _id 
 * @returns {Account} deleted Account infos
 */
const deleteAccount = async (_id) => {
    try{
        console.log("deleted account : ",_id)
        return await Account.deleteOne({_id})
    }catch (error) {
        throw error;
    }
};

module.exports = {
    getAccountById,
    createAccount,
    getAccountByEmail,
    updatePassword,
    deleteAccount
};
