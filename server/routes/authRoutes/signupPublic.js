require('dotenv').config();
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const jwt = require('jsonwebtoken');
const userController = require('../../controllers/userController');


module.exports = async (req, res, next) => {
    try {
        /* Check inputs */
        if (!req.body.userMail || !req.body.userMail.toLowerCase().match(regEmail) || !req.body.userPassword){
            return res.status(400).json({error : "Input(s) non valide(s)"});
        }

        /* Check if database knows this mail */
        if (await userController.getUserByEmail(req.body.userMail)){
            return res.status(400).json({error : "Cet email est déjà utilisé"});
        }
        else {
            /* Create users */
            const user = await userController.createUser(req.body.userMail.toLowerCase(), req.body.userPassword, "client", req.body.userLocalisation, req.body.userArticlesLinked, req.body.userCategories, req.body.userDistance, req.body.userLogoURL);
            /* User created */
            const tokenUser = {
                id: user._id,
                userMail: user.userMail,
                userType: user.userType
            };
            const token = jwt.sign(tokenUser, process.env.tokenkey, {expiresIn: '200000h'});

            return res.status(200).json({
                success: true,
                message: 'Connected !',
                token: token,
                userId: user._id,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error : "Impossible de créer l'utilisateur :" + error
        });
    }
};
