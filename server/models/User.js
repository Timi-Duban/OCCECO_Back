const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    accountId:{
        type: mongoose.ObjectId, ref: "Account",
        required: [ true, "Vous devez lier un User à un Account" ]
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
