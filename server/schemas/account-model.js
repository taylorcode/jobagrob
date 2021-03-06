var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    validate = require('../plugins/validation-regexp.js');

require('../plugins/validation-augments.js');

var AccountSchema = new Schema({
    email: {
        type: String,
        required: true,
        // fieldType: 'email',
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
    company: {
        name: {
            type: String,
            //required: true,
            maxLength: 50,
            trim: true
        },
        jobs: {
          created: [{
            job: {
                type: Schema.ObjectId,
                ref: 'Job'
            },
            resume: {
                filename: String
            }
          }]
        }
    },
    user: {
        firstName: {
            type: String,
            // required: true,
            maxLength: 40,
            trim: true
        },
        lastName: {
            type: String,
            // required: true,
            maxLength: 60,
            trim: true
        },
        jobs: {
          bookmarked: [{
            type: Schema.ObjectId,
            unique: true,
            ref: 'Job'
          }],
          applied: [{
            job: {
                type: Schema.ObjectId,
                ref: 'Job'
            },
            resume: {
                filename: String
            }
          }]
        },
        resumes: {
            someValue: String,
            resumes: [{
                title: {
                    type: String,
                    required: true,
                    maxLength: 100, // TODO implement client-side
                    minLength: 1, // TODO UPDATE
                    trim: true
                },
                tagline: {
                    type: String,
                    maxLength: 200, // TODO implement client-side
                    trim: true
                },
                filename: String
            }]
        }
    }
});


AccountSchema.pre('save', function (next) {
    var user = this;

    // TODO - check for first name last name or company name!

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

AccountSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('Account', AccountSchema);