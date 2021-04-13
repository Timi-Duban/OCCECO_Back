const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountMail: {
        type: String,
        required: [ true, "Le mail de l'utilisateur est obligatoire" ]
    },

    accountPassword: {
        type: String,
        required: [ function() {return !this.googleAccountId}, "Le mot de passe est obligatoire" ]
    },

    user: {
        type: mongoose.ObjectId, ref: "User",
        required: [ true, "Un account doit être lié à un User" ]
    },
    
    accountType: {
        type: String,
        required: true,
        default: "client",
        enum:["admin", "partner", "partnerToCheck", "client"]
    },

    googleAccountId: {
        type: String
    },
});

module.exports = mongoose.model('Account', accountSchema);

