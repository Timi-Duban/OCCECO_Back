const bcrypt = require("bcryptjs");
const saltRounds = 10;

/**
 * used to encrypt any password, to save it on the database
 * @param {String} password password in clear
 * @returns {String} password encrypted
 */
const passwordEncryption = async(password) => {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw error;
    }
};

/**
 * Can compare a password and a crypted one and return if it's the same original or not
 * @param {String} password 
 * @param {String} hash 
 */
const passwordCompare = (password, hash) => {
    if(bcrypt.compareSync(password, hash)) {
        // Passwords match
        return true;
    }
    else {
        return false;
    }
};


module.exports = {
    passwordEncryption,
    passwordCompare
};
