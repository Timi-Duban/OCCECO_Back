require('dotenv').config();
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const jwt = require('jsonwebtoken');
const accountController = require('../../controllers/accountController');
const emailSender = require('../../controllers/utils/emailSender');


module.exports = async (req, res, next) => {
    try {
        /* Check inputs */
        if (!req.body.accountMail || !req.body.accountMail.toLowerCase().match(regEmail)) {
            return res.status(400).json({ error: "Input(s) non valide(s)" });
        }
        const email = String(req.body.accountMail).trim();

        if (!req.body.basicUrl) {
            return res.status(500).json({
                error: "Erreur serveur pendant la création du mail"
            });
        }

        /* Check if database knows this mail */
        if (!await accountController.getAccountByEmail(email)) {
            return res.status(400).json({ error: "Cet email n'est pas dans notre base de données" });
        }
        else {
            const tokenAccount = {
                accountMail: email
            };
            const token = jwt.sign(tokenAccount, process.env.tokenkey, { expiresIn: '124min' });
            const url = req.body.basicUrl + "/?token=" + token;
            console.log("url : ", url);

            await emailSender.sendForgotPasswordEmail(email, url);

            return res.status(200).json({
                success: true,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error: "Erreur serveur pendant la réinitialisation de mot de passe"
        });
    }
};
