const AccountController = require('../../../controllers/accountController');

module.exports = async (req, res) => {
    /* Check inputs */
    if (!req.body.accountMail) {
        return res.status(400).json({ error: "Input(s) non valide(s)" });
    }
    try {
        const account = await AccountController.getAccountByEmail(req.body.accountMail);
        return res.status(200).json(account);
    }
    catch (e) {
        return res.status(500).json({
            error: "Impossible de récupérer cet account"
        });
    }
};