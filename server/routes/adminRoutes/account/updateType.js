const AccountController = require('../../../controllers/accountController');

module.exports = async (req, res) => {
    try{
        const account = await AccountController.updateType(req.body.accountId, req.body.accountType);
        return res.status(200).json(account);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible de modifier cet account"
        });
    }
};