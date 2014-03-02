/* DEPRACATED */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

require('../plugins/validation-augments.js');

var detailsSchema = {};

var resumeSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100, // TODO implement client-side
        minLength: 15,
        trim: true
    },
    tagline: {
        type: String,
        maxLength: 200, // TODO implement client-side
        trim: true
    },
    url: String
});

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
    },
    resumes: [resumeSchema]
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


detailsSchema.user.pre('save', function () {
    console.log("tag on to PREEE saving")
});




module.exports = detailsSchema;