var express = require('express'),
    app = express(),
    logfmt = require('logfmt'),
    port,
    mongo = require('mongodb');
    mongoose = require('mongoose'),
    passport = require('passport'),
    handler = require('restify-errors'),
    Account = require('./server/schemas/account-model'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    routes = require('./server/routes');

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/jobagrob';

mongo.Db.connect(mongoUri, function (err, db) {
    if(err) throw err;
    console.log('Successfully connected to Jobagrob MongoDB.');
});


app.configure(function () {

  app.use(express.static('target'));

  app.use(express.cookieParser());

  app.use(express.bodyParser());

  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(clientErrorHandler);
  routes.setup(app);

  app.use(logfmt.requestLogger());

});

function clientErrorHandler(err, req, res, next) {
  if(err.statusCode) return res.send(err.statusCode, err);
  if(err.name === 'ValidationError') return res.send(400, err);
  res.send(new handler.InternalError('something went wrong'));
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {

    Account.findOne({email: username}, function (err, user) {

        if (err) return done(err);

        if(!user) return done(null, false, { message: 'user with that email does not exist.' });

        user.comparePassword(password, function (err, isMatch) {

            if (err) return done(err);

            // TODO error handling here necessary?
            if(!isMatch) return done(new handler.InvalidArgumentError('INCORRECT PASSWORD.'));
            // correct credentials
            return done(null, user);
        });
        
    });
  }
));

passport.serializeUser(function(account, done) {
    done(null, account._id);
});

passport.deserializeUser(function(id, done) {
  Account.findById(id, function (err, account) {
    done(err, account);
  });
});

app.use(function(req, res) {
    res.sendfile('target/index.html');
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log('Listening on ' + port);
});
