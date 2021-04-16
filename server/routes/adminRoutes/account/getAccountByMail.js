const AccountController = require('../../../controllers/accountController');

module.exports = async (req, res) => {
    try{
        console.log("getAccountByEmail : ", req.body)
        const account = await AccountController.getAccountByEmail(req.body.accountMail);
        return res.status(200).json(account);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible de récupérer cet account"
        });
    }
};