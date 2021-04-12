const User = require('../models/user');
const passwordEncryption = require('../encryption/passwordEncryption');

/**
 * @param {mongoose.ObjectId} _id 
 * @returns {User} User's infos except password
 */
const getUserById = async(_id) => {
    try {
        return await User.findById(_id).select('-userPassword')
    } catch (error) {
        console.log(error)
        throw error;
    }
};

/**
 * @param {String} userMail 
 * @returns {User} User's infos
 */
const getUserByEmail = async(userMail) => {
    try {
        const userMailLowerCased = userMail.toLowerCase()
        return await User.findOne({userMail: userMailLowerCased});
    } catch(error) {
        throw error;
    }
};

/**
 * @param {String} userMail 
 * @param {String} userPassword 
 * @param {String} userType 
 * @param {any} userLocalisation type location (see user model)
 * @param {[mongoose.ObjectId]} userArticlesLinked array of article ids
 * @param {[mongoose.ObjectId]} userCategories array of categories ids
 * @param {Number} userDistance 
 * @param {String} userLogoURL 
 * @returns {User} User's infos
 */
const createUser = async (userMail, userPassword, userType, userLocalisation, userArticlesLinked, userCategories, userDistance, userLogoURL) => {
    const hashedPassword = await passwordEncryption.passwordEncryption(userPassword);
    try {
        const userMailLowerCased = userMail.toLowerCase()
        const user = new User({userMail: userMailLowerCased, userPassword: hashedPassword, userType, userLocalisation, userArticlesLinked, userCategories, userDistance, userLogoURL
        });
        return await user.save();
    } catch (error) {
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} _id 
 * @param {String} userPassword 
 * @returns {User} updated User's infos
 */
const updatePassword = async (_id,userPassword) => {
    try {
        const hashedPassword = await passwordEncryption.passwordEncryption(userPassword);
        return await User.findOneAndUpdate({_id},{userPassword:hashedPassword},{new:true});
    } catch (error) {
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} _id 
 * @returns {User} deleted User's infos
 */
const deleteUser = async (_id) => {
    try{
        console.log(_id)
        return await User.deleteOne({_id})
    }catch (error) {
        throw error;
    }
};

module.exports = {
    getUserById,
    createUser,
    getUserByEmail,
    updatePassword,
    deleteUser
};
