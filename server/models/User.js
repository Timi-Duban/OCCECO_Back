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

userSchema.pre('save', async function(next) {
    await Article
    .find({articleCategories: {$in : this.userCategories }})
    .then(articles => {
        this.userArticlesLinked = articles.map(a => ({articleId: a._id, isOpen: false}))
    })
    next();
});

userSchema.post('findOneAndUpdate', async function(doc, next) {
    await Article
    .find({articleCategories: {$in : doc.userCategories }}, async function (err, docs) {
        doc.userArticlesLinked = docs.map(a => ({articleId: a._id, isOpen: false}))
        await doc.save()
    });
    next();
});

module.exports = mongoose.model('User', userSchema);
