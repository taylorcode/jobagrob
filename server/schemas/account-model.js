var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    validate = require('../plugins/validation-regexp.js'),
    detailsSchema = require('./account-details-schemas');

require('../plugins/validation-augments.js');

var accountSchema = new Schema({
    email: {
        type: String,
        required: true,
        fieldType: 'email',
        unique: true,
        maxLength: 50,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 30,
        trim: true
    },
    details: {
        type: Schema.Types.Mixed,
        set: function (v) {
            // do the validation of the model outside of this schema
            var model = mongoose.model(v.type, detailsSchema[v.type]);
            return new model(v);
        }
    },
    type: {
        type: String,
        enum: ['user', 'company']
    }
});

accountSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

accountSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Account', accountSchema);