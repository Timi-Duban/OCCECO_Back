const User = require('../models/user');
const passwordEncryption = require('../encryption/passwordEncryption');

const getUserById = async(_id) => {
    try {
        return await User.findById(_id).select('-password')
    } catch (error) {
        console.log(error)
        throw error;
    }
};

const getUserByEmail = async(email) => {
    try {
        return await User.findOne({email});
    } catch(error) {
        throw error;
    }
};

// TODO
const createUser = async (userMail, userPassword, userType, userArticl, localisation, userCategories, userDistance) => {
    const hashedPassword = await passwordEncryption.passwordEncryption(password);
    try {
        const user = new User({
            userMail,
            userPassword: hashedPassword,
            userType: userType,
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
