const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userMail: {
        type: String,
        required: [ true, "Le mail de l'utilisateur est obligatoire" ]
    },

    userPassword: {
        type: String,
        required: [ true, "Le mot de passe est obligatoire" ]
    },
    
    userType: {
        type: String,
        required: true,
        default: "client",
        enum:["admin", "partner", "partnerToCheck", "client"]
    },

    userLocalisation: {
        localisationNumber: { type: Number },
        localisationStreet: { type: String },
        localisationPostalCode: { type: Number },
        localisationCity: { type: String }
    },

    userArticlesLinked: {
        type: [{
            articleId : {type: mongoose.ObjectId, ref: 'Article' },
            isOpen : { type: Boolean },
        }],
    },

    userCategories: {
        type: [{type: mongoose.ObjectId, ref: 'TypeArticle' }],
    },

    userDistance: {
        type: Number,
        default: 100,
    },

    userLogoURL: {
        type: String
    }

});

module.exports = mongoose.model('User', userSchema);

