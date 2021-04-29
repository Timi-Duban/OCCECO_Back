require('dotenv').config();
const emailSender = require ('../../controllers/utils/emailSender');
const jwt = require('jsonwebtoken');
const accountController = require('../../controllers/accountController');


module.exports = async (req, res, next) => {
    /* Check inputs */
    if (!req.body.token || !req.body.accountPassword) {
        return res.status(400).json({ error: "Input(s) non valide(s)" });
    }

    jwt.verify(req.body.token, process.env.tokenkey, (err, result) => {
        if (err) {
            res.status(401).json({ error: "Unauthorized" });
        }
    })

    const email = jwt.decode(req.body.token).accountMail;

    try {
        /* Check if database knows this mail */
        const account = await accountController.getAccountByEmail(email);
        if (!account) {
            return res.status(400).json({ error: "Cet email n'est pas dans notre base de données" });
        }
        accountController.updatePassword(account._id, req.body.accountPassword);
        emailSender.sendPasswordChangedEmail(email);
        return res.status(200).json({
            success: true,
            response: "success",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Erreur serveur lors de la réinitialisation du mot de passe"
        });
    }
};
