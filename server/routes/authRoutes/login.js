require('dotenv').config();
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const jwt = require('jsonwebtoken');
const accountController = require('../../controllers/accountController');
const passwordEncryption = require('../../encryption/passwordEncryption');




module.exports = async (req, res) => {
    try {
        /* Check inputs */
        if (!req.body.accountMail || !req.body.accountMail.toLowerCase().match(regEmail) || !req.body.accountPassword){
            return res.status(400).json({error : "Input(s) non valide(s)"});
        }

        /* Check email */
        const account = await accountController.getAccountByEmail(req.body.accountMail.toLowerCase());
        if (!account){
            return res.status(400).json({error : "Cet mail n'est pas dans notre base de donnée"});
        }
        else {

            /* Got account's informations */
            if(passwordEncryption.passwordCompare(req.body.accountPassword, account.accountPassword)){

                /* Account valid */
                const tokenAccount = {
                    id: account._id,
                    accountMail: account.accountMail,
                    accountType: account.accountType
                };
                const token = jwt.sign(tokenAccount, process.env.tokenkey, {expiresIn: '2000h'});

                /* Token created */
                return res.status(200).json({
                    success: true,
                    message: 'Connected !',
                    token: token,
                    account
                });
            }
            else{
                return res.status(400).json({error : "Mot de passe incorrect"});
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            error : "Impossible de connecter l'utilisateur"
        });
    }
};
