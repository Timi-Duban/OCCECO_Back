const UserController = require('../../../controllers/userController');

module.exports = async (req, res) => {
    /* Check inputs */
    if (!req.body._id || !req.body.userPushToken) {
        return res.status(400).json({ error: "Input(s) non valide(s)" });
    }
    try{
        const account = await UserController.addUserPushToken(req.body._id, req.body.userPushToken);
        return res.status(200).json(account);
    }
    catch(e){
        return res.status(500).json({
            error : "Erreur dans l'ajout de cet appareil"
        });
    }
};