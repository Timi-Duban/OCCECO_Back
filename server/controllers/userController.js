const User = require('../models/User')
const TypeArticle = require('../models/TypeArticle'); //to populate user categories
const Account = require('../models/Account');
const accountController = require('./accountController');
const Article = require('../models/Article');
const geolib = require('geolib');

/**
 * @param {[mongoose.ObjectId]} accounts REQUIRED: account linked to the User
 * @param {any} userLocalisation type location (see account model)
 * @param {[mongoose.ObjectId]} userArticlesLinked array of article ids
 * @param {[mongoose.ObjectId]} userCategories array of categories ids
 * @param {Number} userDistance 
 * @param {String} userLogoURL 
 * @returns {User} User infos
 */
const createUser = async (userLocalisation, userArticlesLinked, userCategories, userDistance, userPushTokens, userLogoURL) => {
    try {
        const user = new User({ userLocalisation, userArticlesLinked, userCategories, userDistance, userPushTokens, userLogoURL });
        //return (await user.save()).populate('userCategories');
        return await linkUserWithArticle(user);
    } catch (error) {
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} _id 
 * @returns {User} all User infos
 */
const getUserById = async (_id) => {
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
const updateUser = async (_id, userLocalisation, userArticlesLinked, userCategories, userDistance, userPushTokens, userLogoURL) => {
    try {
        const userUpdated =  await User.findOneAndUpdate({ _id }, { userLocalisation, userArticlesLinked, userCategories, userDistance, userPushTokens, userLogoURL }, { new: true }).populate('userCategories');
        const user =  await linkUserWithArticle(userUpdated);
        console.log("in update =", user)
        return user
    } catch (error) {
        console.log(error)
        throw error;
    }
}

/**
 * Add the token in the user if it isn't already
 * @param {mongoose.ObjectId} _id id user
 * @param {String} userPushToken The token given by  
 * @returns the User after it was modified
 */
const addUserPushToken = async (_id, userPushToken) => {
    try {
        return (await User.findOneAndUpdate({ _id }, { $addToSet: { userPushTokens: userPushToken } }, { new: true })).populate('userCategories');
    } catch (error) {
        console.log(error)
        throw error;
    }
}

/**
 * Warning: doesn't tell if a token was deleted or not 
 * @param {mongoose.ObjectId} _id id user
 * @param {String} userPushToken The token given by expo
 * @returns the User after it was modified, without the token if it existed
 */
const deleteUserPushTokenById = async (_id, userPushToken) => {
    console.log(" >>> deleteUserPushTokenById", _id, userPushToken);
    try {
        return (await User.findOneAndUpdate({ _id }, { $pull: { userPushTokens: userPushToken } }, { new: true }));
    } catch (error) {
        console.log(error)
        throw error;
    }
}

/**
 * If you know the user's Id, use deleteUserPushTokenById instead
 * @param {String} userPushToken The token given by expo
 * @returns null or the User after it was modified
 */
const deleteUserPushToken = async (userPushToken) => {
    console.log(" >>> deleteUserPushToken ", userPushToken);
    try {
        userModified = await User.findOneAndUpdate({ userPushTokens: userPushToken }, { $pull: { userPushTokens: userPushToken } }, { new: true });
        if (!userModified) {
            console.error("deleteUserPushToken - NO USER FOUND WITH THIS TOKEN ", userPushToken);
        }
        return (userModified);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

/**
 * @returns an array of all users
 */
const getAllUsers = async () => {
    return await User.find().populate({ path: 'userArticlesLinked.articleId', populate: {path: 'articleCategories' }});
}

const linkUserWithArticle = async (user) => {
    
    await Article
    .find({articleCategories: {$in : user.userCategories.map(c => c._id) }}, async function (err, docs) {
        if (err){
            console.log("err = ", err)
        }
        user.userArticlesLinked = docs.filter(a => {
            if (a.articleLocalisation && a.articleLocalisation.lat && a.articleLocalisation.lng){
                if (geolib.getDistance(a.articleLocalisation, user.userLocalisation) <= user.userDistance*1000){
                    return true
                }
                return false
            }
            return true
        })
        .map(a => ({articleId: a._id, isOpen: false}))
        await user.save()
    });
    return user
}

    module.exports = {
        createUser,
        getUserById,
        updateUser,
        addUserPushToken,
        deleteUserPushToken,
        getAllUsers,
        deleteUserPushTokenById,
    }