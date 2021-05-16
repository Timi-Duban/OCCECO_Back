const moment = require('moment');
const mongoose = require('mongoose');
const User = require('./User');

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
        default: moment().set({'hour':8, 'minute':00}), // Par défaut initialise à la date d'aujourd'hui
    },

    articleEndDate: {
        type: Date,
    },
    articleDateEvent: {
        type: Date
    },

    isEvent: {
        type: Boolean,
        default: false
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

articleSchema.post('save', function(doc, next) {
    User
    .find({userCategories: {$in : doc.articleCategories }})
    .then(users => {
        console.log(users)
        users.forEach(user => {
            user.userArticlesLinked.push({articleId: doc._id, isOpen: false})
            user.save()
        })
    })
    
    next();
});
articleSchema.post('findOneAndUpdate', function(doc, next) {
    User
    .find({userCategories: {$in : doc.articleCategories }})
    .then(users => {
        console.log(users)
        users.forEach(user => {
            if (!user.userArticlesLinked.includes(a => a.articleId === doc._id)){
                user.userArticlesLinked.push({articleId: doc._id, isOpen: false})
            }
            else {
                user.userArticlesLinked = user.userArticlesLinked.map(a => {
                    if (a.articleId === doc._id){
                        a.isOpen = false;
                    }
                    return a 
                })
            }
            
            user.save()
        })
    })
    
    next();
});
module.exports = mongoose.model('Article', articleSchema);

