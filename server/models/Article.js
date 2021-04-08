const moment = require('moment');
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({

    articleTitle: {
        type: String,
        required: [ true, "Le nom de l'article est obligatoire" ]
    },

    articleLink: {
        type: String,
        required: [ true, "Le lien de l'article est obligatoire" ]
    },

    articleDescription: {
        type: String,
    },

    articleStartDate: {
        type: Date,
        required: [ true, "La date de début de l'article est obligatoire" ],
        default: moment(), // Par défaut initialise à la date d'aujourd'hui
    },

    articleEndDate: {
        type: Date,
    },

    articleLocalisation: {
        localisationNumber: { type: Number },
        localisationStreet: { type: String },
        localisationPostalCode: { type: Number },
        localisationCity: { type: String }
    },

    articleCategories: [{
        type: mongoose.ObjectId, ref: "TypeArticle"
    }],

    articleEditor:{
        type: mongoose.ObjectId, ref: "User"
    },

    articleIsValidated: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('Article', articleSchema);

