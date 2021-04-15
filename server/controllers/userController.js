const User = require('../models/User')
const Account = require('../models/Account');
const accountController = require('./accountController');


/**
 * @param {[mongoose.ObjectId]} accounts REQUIRED: account linked to the User
 * @param {any} userLocalisation type location (see account model)
 * @param {[mongoose.ObjectId]} userArticlesLinked array of article ids
 * @param {[mongoose.ObjectId]} userCategories array of categories ids
 * @param {Number} userDistance 
 * @param {String} userLogoURL 
 * @returns {User} User infos
 */
 const createUser = async (accounts, userLocalisation, userArticlesLinked, userCategories, userDistance, userLogoURL) => {
    try {
        const user = new User({accounts, userLocalisation, userArticlesLinked, userCategories, userDistance, userLogoURL});
        return await user.save();
    } catch (error) {
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} _id 
 * @returns {User} all User infos
 */
const getUserById = async(_id) => {
    try {
        return await (await User.findById(_id)).populate('accounts')
    } catch (error) {
        console.log(error)
        throw error;
    }
};

// TODO: delete this
/**
 * @param {String} mail one mail linked to the account
 * @returns {User} all User infos
 */
 const getUserByMail = async(mail) => {
    const accountMail = mail.toLowerCase()
    try {
        console.log("\n\n\nuserController get email in. ", accountMail);
        const user = await User.findOne({accounts: {accountMail}})
        console.log("user found : ", user);
        return user.populate('accounts')
    } catch (error) {
        console.log(error)
        throw error;
    }
};

module.exports = {
    createUser,
    getUserById,
}