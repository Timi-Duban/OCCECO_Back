const UserController = require('../../../controllers/userController');

module.exports = async (req, res) => {
    /* Check inputs */
    if (!req.body._id){
        return res.status(400).json({ error: "Input(s) non valide(s)" });
    }
    try{
        console.log("je suis dans le get User")
        const user = await UserController.getUserById(req.body._id);
        return res.status(200).json(user);
    }
    catch(e){
        console.log("Un problème est survenu")
        return res.status(500).json({
            error : "Erreur dans l'ajout de cet appareil"
        });
    }
};