const mongoose = require('mongoose');

const typeArticleSchema = new mongoose.Schema({
    nameType: {
        type: String,
        required: [ true, "La catégorie de l'article est obligatoire" ]
    },
    iconType: {
        type: String,
    },
    colorType: {
        type: String,
    },
    
});

module.exports = mongoose.model('TypeArticle', typeArticleSchema);

