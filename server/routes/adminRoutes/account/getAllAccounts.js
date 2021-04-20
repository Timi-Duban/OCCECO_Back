const AccountController = require('../../../controllers/accountController');

module.exports = async (req, res) => {
    try{
        const accounts = await AccountController.getAllAccounts();
        return res.status(200).json(accounts);
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible de récupérer les comptes"
        });
    }
};