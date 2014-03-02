// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema,
//     validate = require('../plugins/validation-regexp.js');
//     // extend = require('mongoose-schema-extend');

// require('../plugins/validation-augments.js');

// var ResumeSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//         maxLength: 100, // TODO implement client-side
//         minLength: 1, // TODO UPDATE
//         trim: true
//     },
//     tagline: {
//         type: String,
//         maxLength: 200, // TODO implement client-side
//         trim: true
//     },
//     url: String,
//     _creator: {
//         type: Schema.Types.ObjectId,
//         ref: 'Person'
//     }
// });


// module.exports = mongoose.model('Resume', ResumeSchema);