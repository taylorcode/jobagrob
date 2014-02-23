var passport = require('passport'),
    handler = require('restify-errors'),
	Account = require('../schemas/account-model'),
	formatResponse = require('../plugins/response-formatter.js');


/* middlewares */
function logOut (req, res, next) {
	delete req.account;
	req.logOut();
	return next();
}

function checkAuth (req, res, next) {
	if(!req.isAuthenticated()) return next(new handler.NotAuthorizedError('Not logged in.'));
	return next();
}

// ensure that req.account has the account on it
function account (req, res, next) {
	if(req.account) return next();
	Account.findById(req.user._id)
		   .select('-password')
		   .exec(function (err, account) {
		   		if(err) return next(err);
		   		req.account = account;
		   		next();
			});
}

function setup (app) {

	app.post('/api/signup', function (req, res, next) {

			var acct = req.body,
				account;

			acct.details.type = acct.type; // attach type to details for the details schema

			account = new Account(acct);

		    account.save(function (err, account) {

		    	if(err) {
			        if(err.name === 'MongoError') return next(new handler.InvalidArgumentError('Account with that email already exists.'));
		    		return next(err);
		    	}

	        	return res.send(formatResponse('account created.'));
		    });

	});

	app.post('/api/login', logOut, passport.authenticate('local'), function (req, res, next) {

		res.send(formatResponse('Logged in.'));

	});

	app.post('/api/logout', logOut);

	app.post('/api/checklogin', checkAuth, account, function (req, res, next) {
		res.send(req.account);
	});

	app.post('/api/account/resumes', function (req, res, next) {
		console.log('HOLLA ! GOT HERE');
		console.log(req.files);
	});

}

exports.setup = setup;