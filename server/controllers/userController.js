const User = require('../models/User')
const TypeArticle = require('../models/TypeArticle'); //to populate user categories
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
 const createUser = async (userLocalisation, userArticlesLinked, userCategories, userDistance, userLogoURL) => {
    try {
        const user = new User({userLocalisation, userArticlesLinked, userCategories, userDistance, userLogoURL});
        return (await user.save()).populate('userCategories');
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
        return await (await User.findById(_id)).populate('userCategories')
    } catch (error) {
        console.log(error)
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} _id id user
 * @param {any} userLocalisation type location (see account model)
 * @param {[mongoose.ObjectId]} userArticlesLinked array of article ids
 * @param {[mongoose.ObjectId]} userCategories array of categories ids
 * @param {Number} userDistance 
 * @param {String} userLogoURL 
 * @returns {User} User infos updated
 */
const updateUser = async(_id, userLocalisation, userArticlesLinked, userCategories, userDistance, userPushTokens, userLogoURL) => {
    try {
        return (await User.findOneAndUpdate({_id},{userLocalisation, userArticlesLinked, userCategories, userDistance, userPushTokens, userLogoURL},{new:true})).populate('userCategories');
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    createUser,
    getUserById,
    updateUser
}