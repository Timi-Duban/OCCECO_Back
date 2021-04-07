const mongoose = require('mongoose');

const localisationSchema = new mongoose.Schema({

    localisationNumber: {
        type: Number,
    },

    localisationStreet: {
        type: String,
    },

    localisationPostalCode: {
        type: Number,
    },

    localisationCity: {
        type: String,
    },

});

module.exports = mongoose.model('Localisation', localisationSchema);

