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
        return await Account.findById(_id).select('-accountPassword').populate('user')
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
        return await Account.findOne({accountMail: accountMailLowerCased}).populate('user');
    } catch(error) {
        throw error;
    }
};

/**
 * @param {String} accountMail 
 * @param {String} accountPassword 
 * @param {String} accountType 
 * @returns {User} Account and user infos in account.user
 */
const createAccountAndPopulate = async (accountMail, accountPassword, accountType) => {
    const account = await createAccount(accountMail, accountPassword, accountType);
    return getAccountById(account._id)
};

const createAccount = async (accountMail, accountPassword, accountType) => {
    const hashedPassword = await passwordEncryption.passwordEncryption(accountPassword);
    try {
        const user = new User({})
        await user.save()
        try{
            const accountMailLowerCased = accountMail.toLowerCase()
            const account = new Account({accountMail: accountMailLowerCased, accountPassword: hashedPassword, user: user._id, accountType});
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
const updatePassword = async (_id,accountPassword) => {
    try {
        const hashedPassword = await passwordEncryption.passwordEncryption(accountPassword);
        return await Account.findOneAndUpdate({_id},{accountPassword:hashedPassword},{new:true});
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
    try{
        return await Account.findOneAndUpdate({_id: accountId}, {accountMail}, {new:true})
    }catch (error) {
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} accountId 
 * @param {String} accountType
 * @returns {Account} updated Account infos
 */
 const updateType = async (accountId, accountType) => {
    try{
        return await Account.findOneAndUpdate({_id: accountId}, {accountType}, {new:true})
    }catch (error) {
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

const getAllAccounts = async() => {
    try {
        return await Account.find().populate('user')
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
