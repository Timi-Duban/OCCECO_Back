/* users bcrypt package to has password with salt */
const bcrypt = require("bcryptjs");
const saltRounds = 10;

/* passwordEncryption :
params :  uncrypted password
return : encrypted password
 */
const passwordEncryption = async(password) => {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw error;
    }
};

const passwordCompare = (password, hash) => {
    if(bcrypt.compareSync(password, hash)) {
        // Passwords match
        return true;
    }
    else {
        return false;
    }
};

const validationCode = async (name) =>{
    const r = Math.floor(Math.random() * Math.floor(1000));
    const str = name + "memomental" + r.toString();
    const code = await bcrypt.hash(str, saltRounds);
    return code.slice(10,16);
};

const tempPassword = async (mail) =>{
    const r = Math.floor(Math.random() * Math.floor(1000));
    const str = mail + "memomental" + r.toString();
    const pass = await bcrypt.hash(str, saltRounds);
    return pass.slice(10,16);
};

module.exports = {
    passwordEncryption,
    passwordCompare,
    validationCode,
    tempPassword
};
