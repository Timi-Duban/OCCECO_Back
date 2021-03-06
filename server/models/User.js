const mongoose = require('mongoose');
const Article = require('./Article');

const userSchema = new mongoose.Schema({
    userLocalisation: {
        lat: { type: Number },
        lng: { type: Number }
    },

    userArticlesLinked: {
        type: [{
            articleId: { type: mongoose.ObjectId, ref: 'Article' },
            isOpen: { type: Boolean },
        }],
    },

    userCategories: {
        type: [{ type: mongoose.ObjectId, ref: 'TypeArticle' }],
    },

    userDistance: {
        type: Number,
        default: 100,
    },

    userPushTokens: {
        type: [String],
        default: [],
    },

    userLogoURL: {
        type: String
    }
});


module.exports = mongoose.model('User', userSchema);
