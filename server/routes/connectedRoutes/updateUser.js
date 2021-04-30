const UserController = require('../../controllers/userController');

module.exports = async (req, res) => {
    /* Check inputs */
    if (!req.body._id || !req.body.userLocalisation || !req.body.userArticlesLinked || !req.body.userCategories || !req.body.userDistance) {
        return res.status(400).json({ error: "Input(s) non valide(s)" });
    }
    try {
        const user = await UserController.updateUser(
            req.body._id,
            req.body.userLocalisation,
            req.body.userArticlesLinked,
            req.body.userCategories,
            req.body.userDistance,
            req.body.userLogoURL,
        );
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(500).json({
            error: "Impossible d'update cet user"
        });
    }
};