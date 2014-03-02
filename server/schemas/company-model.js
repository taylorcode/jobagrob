var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validate = require('../plugins/validation-regexp.js'),
    AccountSchema = require('./account-schema'),
    extend = require('mongoose-schema-extend');


var CompanySchema = AccountSchema.extend({
    name: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    }
});

module.exports = mongoose.model('Company', CompanySchema);