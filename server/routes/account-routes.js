var passport = require('passport'),
    handler = require('restify-errors'),
	Account = require('../schemas/account-model'),
	formatResponse = require('../plugins/response-formatter.js');
	path = require('path'),
	fs = require('fs'),
	ObjectId = require('mongoose').Types.ObjectId; 

function trueRandom () {
    return Math.random().toString(36).substring(7) + '-' + (+new Date()).toString(36);
}

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

// // ensure that req.account has the account on it
// function account (req, res, next) {
// 	//if(req.account) return next();
// 	req.account = Account.findById(req.user._id).select('-password');
// 	return next();
// }

function isUser (req, res, next) {
		return next();
	// req.account.select('user').exec(function (err, user) {
	// 	console.log(user);
	// 	return next();
	// });
}

function isCompany (req, res, next) {
		return next();
	// req.account.select('company').exec(function (err, company) {
	// 	console.log(company);
	// 	return next();
	// });
}

function getAccount (req) {
	return Account.findById(req.user._id).select('-password');
}

function setup (app) {


	app.post('/api/signup', function (req, res, next) {

			var acct = req.body,
				account = new Account(acct);

		    account.save(function (err, account) {

		    	console.log(acct);

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

	// app.post('/api/checklogin', checkAuth, account, function (req, res, next) {
	// 	res.send(req.account);
	// });

	app.get('/api/account/resumes', checkAuth, isUser, function (req, res, next) {

		var account = getAccount(req);

		account.exec(function (err, acct) {
			console.log(err);
			if(err) return next(err);
			res.send(acct.user.resumes);
		});

	});

	app.post('/api/account/resumes', checkAuth, isUser, function (req, res, next) {
		var resumes = req.body,
			account = getAccount(req);

		account.exec(function (err, acct) {
			if(err) return next(err);

			acct.user.resumes = resumes;

			acct.save(function(err, acct) {
				res.send(acct.user.resumes);
			});

		});

	});

	// app.post('/api/account/resumes/:id', checkAuth, account, isUser, function (req, res, next) {
	// 	var id = req.params.id,
	// 		resume = req.body,
	// 		account = req.account;

	// 	account.user.resumes.id(id).remove(); // remove old
	// 	account.user.resumes.push(resume); // push new

	// 	account.save(function (err, acct) {
	// 		if(err) return next(err);
	// 		res.send(resume);
	// 	});

	// });

	// app.delete('/api/account/resumes/:id', checkAuth, account, function (req, res, next) {

	// 	var id = req.params.id,
	// 		account = req.account,
	// 		resume;
	// 	resume = account.user.resumes.id(id);
	// 	resume.remove();

	// 	account.save(function (err, acct) {
	// 		console.log(err);
	// 		if(err) return next(err);
	// 		res.send(resume);
	// 	});
	// });

	app.post('/api/account/resume/file', checkAuth, isUser, function (req, res, next) {

    	var resume = req.files.resume;

    	// read the incoming file
        fs.readFile(resume.path, function(err, data) {

        	// TODO check to make sure the file is of the right type & size
        	var filename = trueRandom() + '.pdf',
        		newFileLocation = path.join('target/uploads/resumes', filename); // TODO create CONST "target"

        	// write the file to the server
            fs.writeFile(newFileLocation, data, function (err) {
				res.send({
					filename: filename
				})
            });

        });

	});

}

exports.setup = setup;