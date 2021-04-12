require('dotenv').config();
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const jwt = require('jsonwebtoken');
const accountController = require('../../controllers/accountController');


module.exports = async (req, res, next) => {
    try {
        /* Check inputs */
        if (!req.body.accountMail || !req.body.accountMail.toLowerCase().match(regEmail) || !req.body.accountPassword){
            return res.status(400).json({error : "Input(s) non valide(s)"});
        }

        /* Check if database knows this mail */
        if (await accountController.getAccountByEmail(req.body.accountMail)){
            return res.status(400).json({error : "Cet email est déjà utilisé"});
        }
        else {
            /* Create account */
            const account = await accountController.createAccount(req.body.accountMail, req.body.accountPassword, req.body.accountType, req.body.userLocalisation, req.body.userArticlesLinked, req.body.userCategories, req.body.userDistance, req.body.userLogoURL);
            /* Account created */
            const tokenAccount = {
                id: account._id,
                accountMail: account.accountMail,
                accountType: account.accountType
            };
            const token = jwt.sign(tokenAccount, process.env.tokenkey, {expiresIn: '2000h'});

            return res.status(200).json({
                success: true,
                message: 'Connected !',
                token: token,
                accountId: account._id,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error : "Impossible de créer l'utilisateur :" + error
        });
    }
};
