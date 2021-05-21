const AccountController = require('../../../controllers/accountController');
const passwordEncryption = require('../../../encryption/passwordEncryption');


module.exports = async (req, res) => {
    /* Check inputs */
    if (!req.body.newAccountPassword || !req.body.oldAccountPassword ||!req.token) {
        return res.status(400).json({ error: "Input(s) non valide(s)" });
    }
    if (!req.token) { // Check auth middlewares
        return res.status(500).json({
            error: "Erreur serveur, réessayez plus tard"
        });
    }
    const account = await AccountController.getAccountById(req.token.id);
    if (!account) {
        return res.status(400).json({ error: "Ce compte n'est pas dans notre base de donnée" });
    }
    else {
        /* Got account's informations */
        if (passwordEncryption.passwordCompare(req.body.oldAccountPassword, account.accountPassword)) {
            try {
                const account = await AccountController.updatePassword(req.token.id, req.body.newAccountPassword);
                return res.status(200).json(account);
            }
            catch (e) {
                return res.status(500).json({
                    error: "Impossible de modifier le mot de passe de ce compte"
                });
            }
        } 
        else{
            return res.status(400).json({error : "Ancien mot de passe incorrect"});
        }
    }
};