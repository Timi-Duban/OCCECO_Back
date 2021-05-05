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
        lat: { type: Number },
        lng: { type: Number }
    },

    articleCategories: [{
        type: mongoose.ObjectId, ref: "TypeArticle"
    }],

    articleEditor:{
        type: mongoose.ObjectId, ref: "Account"
    },

    isArticleValidated: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Article', articleSchema);

