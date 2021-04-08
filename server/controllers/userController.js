const User = require('../models/user');
const passwordEncryption = require('../encryption/passwordEncryption');

const getUserById = async(_id) => {
    try {
        return await User.findById(_id).select('-userPassword')
    } catch (error) {
        console.log(error)
        throw error;
    }
};

const getUserByEmail = async(userMail) => {
    try {
        return await User.findOne({userMail});
    } catch(error) {
        throw error;
    }
};

const createUser = async (userMail, userPassword, userType, userLocalisation, userArticlesLinked, userCategories, userDistance, userLogoURL) => {
    const hashedPassword = await passwordEncryption.passwordEncryption(userPassword);
    try {
        const user = new User({userMail, userPassword: hashedPassword, userType, userLocalisation, userArticlesLinked, userCategories, userDistance, userLogoURL
        });
        return await user.save();
    } catch (error) {
        throw error;
    }
};

const updatePassword = async (_id,password) => {
    try {
        const hashedPassword = await passwordEncryption.passwordEncryption(password);
        return await User.findOneAndUpdate({_id},{password:hashedPassword},{new:true});
    } catch (error) {
        throw error;
    }
};


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
