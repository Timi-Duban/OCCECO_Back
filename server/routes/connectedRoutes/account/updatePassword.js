const AccountController = require('../../../controllers/accountController');

module.exports = async (req, res) => {
    try{
        const account = await AccountController.updateMail(req.body.accountId, req.body.accountMail);
        return res.status(200).json(account);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible de modifier le mail de cet account"
        });
    }
};