const User = require('../models/User')

/**
 * @param {[mongoose.ObjectId]} accountId REQUIRED: account linked to the User
 * @param {any} userLocalisation type location (see account model)
 * @param {[mongoose.ObjectId]} userArticlesLinked array of article ids
 * @param {[mongoose.ObjectId]} userCategories array of categories ids
 * @param {Number} userDistance 
 * @param {String} userLogoURL 
 * @returns {User} User infos
 */
 const createUser = async (accountId, userLocalisation, userArticlesLinked, userCategories, userDistance, userLogoURL) => {
    try {
        const user = new User({accountId, userLocalisation, userArticlesLinked, userCategories, userDistance, userLogoURL});
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
        return await (await User.findById(_id)).populate('accountId')
    } catch (error) {
        console.log(error)
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} _id id of the account
 * @returns {User} all User infos
 */
 const getUserByMail = async(accountMail) => {
    try {
        return await User.findById(_id)
    } catch (error) {
        console.log(error)
        throw error;
    }
};

module.exports = {
    createUser,
}