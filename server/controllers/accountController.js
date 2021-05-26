const Account = require('../models/Account');
const User = require('../models/User');
const TypeArticle = require('../models/TypeArticle'); //to populate user categories
const passwordEncryption = require('../encryption/passwordEncryption');
const createUser = require('./userController');

/**
 * @param {mongoose.ObjectId} _id 
 * @returns {Account} Account infos
 */
const getAccountById = async (_id) => {
    try {
        return await Account.findById(_id).populate({
            path: 'user', populate: { path: 'userCategories userArticlesLinked', populate: {path: 'articleId'} }
        });
    } catch (error) {
        console.log(error)
        throw error;
    }
};

/**
 * @param {String} accountMail 
 * @returns {Account} Account infos
 */
const getAccountByEmail = async (accountMail) => {
    try {
        const mailWithoutWhiteSpaces = String(accountMail).trim();
        const accountMailLowerCased = mailWithoutWhiteSpaces.toLowerCase();
        return await Account.findOne({ accountMail: accountMailLowerCased }).populate({
            path: 'user', populate: { path: 'userCategories userArticlesLinked', populate: {path: 'articleId'} }
        });
    } catch (error) {
        throw error;
    }
};

/**
 * @param {String} accountMail 
 * @param {String} accountPassword 
 * @param {String} accountType 
 * @param {String} userLocalisation 
 * @param {Array} userArticlesLinked 
 * @param {String} userCategories 
 * @param {String} userDistance 
 * @param {String} userPushTokens 
 * @param {String} userLogoURL
 * @returns {User} Account and user infos in account.user
 */
const createAccountAndPopulate = async (accountMail, accountPassword, accountType) => {
    const account = await createAccount(accountMail, accountPassword, accountType);
    return getAccountById(account._id)
};
// const createAccountAndPopulate = async (accountMail, accountPassword, accountType,userLocalisation, userArticlesLinked, userCategories, userDistance, userPushTokens, userLogoURL) => {
//     const account = await createAccount(accountMail, accountPassword, accountType,userLocalisation, userArticlesLinked, userCategories, userDistance, userPushTokens, userLogoURL);
//     return getAccountById(account._id)
// };

const createAccount = async (accountMail, accountPassword, accountType, userLocalisation, userArticlesLinked, userCategories, userDistance, userPushTokens, userLogoURL) => {
    const hashedPassword = await passwordEncryption.passwordEncryption(accountPassword);
    try {
        //         const user = createUser(userLocalisation, userArticlesLinked, userCategories, userDistance, userPushTokens, userLogoURL)
        const user = new User({
            userLocalisation: {
                lat: 43.60910915581649,
                lng: 3.877487182617188
            }
        })
        await user.save()
        try {
            const accountMailLowerCased = accountMail.toLowerCase()
            const account = new Account({ accountMail: accountMailLowerCased, accountPassword: hashedPassword, user: user._id, accountType });
            return await account.save()
        } catch (error) {
            console.log("error while creating account")
        }
    } catch (error) {
        console.log("error while creating the user of this account");
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} _id 
 * @param {String} accountPassword 
 * @returns {Account} updated Account infos
 */
const updatePassword = async (_id, accountPassword) => {
    try {
        const hashedPassword = await passwordEncryption.passwordEncryption(accountPassword);
        const account = (await Account.findOneAndUpdate({ _id }, { accountPassword: hashedPassword }, { new: true }));
        return getAccountById(account._id);
    } catch (error) {
        throw error;
    }
};

/**
 * /!\ Vérifier avant d'appeler cette fonction si le mail est disponible ou déjà utilisé
 * @param {mongoose.ObjectId} accountId 
 * @param {String} accountMail
 * @returns {Account} updated Account infos
 */
const updateMail = async (accountId, accountMail) => {
    try {
        const account = (await Account.findOneAndUpdate({ _id: accountId }, { accountMail }, { new: true }));
        return getAccountById(account._id);
    } catch (error) {
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} accountId 
 * @param {String} accountType
 * @returns {Account} updated Account infos
 */
const updateType = async (accountId, accountType) => {
    try {
        const account = await Account.findOneAndUpdate({ _id: accountId }, { accountType }, { new: true });
        return getAccountById(account._id);
    } catch (error) {
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} _id 
 * @returns {Account} deleted Account infos
 */
const deleteAccount = async (_id) => {
    try {
        console.log("deleted account : ", _id)
        return await Account.deleteOne({ _id })
    } catch (error) {
        throw error;
    }
};

const getAllAccounts = async () => {
    try {
        return await Account.find().populate({
            path: 'user', populate: { path: 'userCategories' }
        });
    } catch (error) {
        console.log(error)
        throw error;
    }
};



module.exports = {
    getAccountById,
    createAccount,
    createAccountAndPopulate,
    getAccountByEmail,
    updatePassword,
    updateMail,
    updateType,
    deleteAccount,
    getAllAccounts
};
