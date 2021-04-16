const AccountController = require('../../../controllers/accountController');

module.exports = async (req, res) => {
    try{
        var informations = {...req.body};
        delete informations.accountPassword;
        const account = await AccountController.updateAccount(informations.accountId, informations);
        return res.status(200).json(account);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible de modifier cet account"
        });
    }
};