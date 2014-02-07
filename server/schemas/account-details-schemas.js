var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

require('../plugins/validation-augments.js');

var detailsSchema = {};

detailsSchema.user = new Schema({
    id: false,
    _id: false,
    firstName: {
        type: String,
        required: true,
        maxLength: 40,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 60,
        trim: true
    }
});

detailsSchema.company = new Schema({
    id: false,
    _id: false,
    name: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    }
});

module.exports = detailsSchema;