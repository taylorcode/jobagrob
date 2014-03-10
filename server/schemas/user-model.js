/// DEPRACATED

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validate = require('../plugins/validation-regexp.js'),
    AccountSchema = require('./account-schema'),
    extend = require('mongoose-schema-extend');

var UserSchema = AccountSchema.extend({
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
    resumes: [{
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
    }],
    jobs: {
      bookmarked: [{
        type: Schema.ObjectId,
        ref: 'Job'
      }]
      // applied for 
    }
});

module.exports = mongoose.model('User', UserSchema);