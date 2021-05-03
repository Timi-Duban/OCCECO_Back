const AccountController = require('../../../controllers/accountController');

module.exports = async (req, res) => {
    /* Check inputs */
    if (!req.body.accountId || !req.body.accountType || (req.body.accountType !== "admin" && req.body.accountType !== "partner" && req.body.accountType !== "partnerToCheck" && req.body.accountType !== "client")) {
        return res.status(400).json({ error: "Input(s) non valide(s)" });
    }
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