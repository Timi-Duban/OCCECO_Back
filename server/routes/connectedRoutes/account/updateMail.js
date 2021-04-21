require('dotenv').config();
const AccountController = require('../../../controllers/accountController');
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


module.exports = async (req, res) => {
    /* Check inputs */
    if (!req.body.newAccountMail || !req.body.newAccountMail.toLowerCase().match(regEmail)){
        return res.status(400).json({error : "Input(s) non valide(s)"});
    }
    if (await AccountController.getAccountByEmail(req.body.newAccountMail)) {
        return res.status(400).json({ error: "Cet email est déjà utilisé" });
    } 
    else {
        try {
            const account = await AccountController.updateMail(req.token.id, req.body.newAccountMail);
            return res.status(200).json(account);
        }
        catch (e) {
            return res.status(500).json({
                error: "Impossible de modifier le mail de cet account"
            });
        }
    }
};