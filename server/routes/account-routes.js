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

/// TOTOTOTOTOTO TODO!!!  - this should be merged with the passport deserialize
function getAccount (req) {
	return Account.findById(req.user._id).select('-password');
}

function setup (app) {


	// TODO - move this somewhere else
	// restrict access to any of the assets if not logged in
	// app.get('/assets/*', function (req, res, next) {
	// 	//console.log("CRAP!!!");
	// 	//console.log("CRAPPPPP")
	// 	//return next(new handler.NotAuthorizedError('Not logged in.'))
	// 	//console.log(req.)
	// 	return next();
	// });

	// app.get(/^\/(job|account|profile)(\/|(?!\S))/, function (req, res, next) {
	// 	//console.log("CRAP!!!");
	// 	//console.log("CRAPPPPP")
	// 	//return next(new handler.NotAuthorizedError('Not logged in.'))
	// 	//console.log(req.)
	// 	if(!req.isAuthenticated()) next(new handler.NotAuthorizedError('Not logged in.'));
	// 	return next();
	// });


	// get the current account
	app.get('/api/account', function (req, res, next) {
		// TODO - this should probably return a 401, however client-side auto-redirects to /login if a 401 or 403 is ever thrown
		// so it restricts access to pages that both users and non-users can access. Bumski
		if(req.isAuthenticated()) return res.send(req.user);
		return res.send(formatResponse('guest user.'));
	});

	// Make a new account
	app.post('/api/account', function (req, res, next) {

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

		//res.send(req.user); tODODODODODD FOR SOME REASON THIS IS SENDIN THE PASSWORD - CHECK THE DESERIALIZE USER METHOD
		res.send(formatResponse('logged in.'));

	});

	app.post('/api/logout', logOut);


	// app.get('/api/account', checkAuth, isUser, function (req, res, next) {

	// 	// NOT AUTHORIZED BUT IS AUTHENTICATED
	// 	if(req.user) return res.send(req.user);
	// 	return next(new handler.NotAuthorizedError('Not a user.'));
	// });

	// app.get('/api/user', checkAuth, isUser, function (req, res, next) {

	// 	// NOT AUTHORIZED BUT IS AUTHENTICATED
	// 	if(req.user) return res.send(req.user);
	// 	return next(new handler.NotAuthorizedError('Not a user.'));
	// });

	// app.get('/api/company', checkAuth, isCompany, function (req, res, next) {

	// 	// NOT AUTHORIZED BUT IS AUTHENTICATED
	// 	if(req.user) return res.send(req.user);
	// 	return next(new handler.NotAuthorizedError('Not a company.'));
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


	// /* Bookmark a job on the users profile */
	app.post('/api/account/jobs/bookmarks/:id', function (req, res, next) {

		// req.body and req.params have the id property

		var account = getAccount(req),
			jobId = req.params.id;

		account.exec(function (err, acct) {

			var jobIndex,
				bookmarked = acct.user.jobs.bookmarked,
				isBookmarked;

			if(err) return next(err);

			// TODO safe CHECK if this job exists - USING $addToSet (preferably with mongoose plugin)
			jobIndex = bookmarked.indexOf(jobId);

			if(jobIndex === -1) {
				isBookmarked = true;
				bookmarked.push(jobId); // bookmark
			} else {
				isBookmarked = false;
				bookmarked.splice(jobIndex, 1); // unbookmark
			}

			acct.save(function (err, acct) {
				if(err) return next(err);
				res.send({_id: jobId, isBookmarked: isBookmarked}); // return the reference to the new job bookmark or deleted job bookmark with the status
			});
		});

	});

	app.get('/api/account/jobs/bookmarks/:id', function (req, res, next) {

		var account = getAccount(req),
			isBookmarked,
			jobId = req.params.id;

		account.exec(function (err, acct) {
			isBookmarked = acct.user.jobs.bookmarked.indexOf(req.params.id) === -1 ? false: true;
			res.send({_id: jobId, isBookmarked: isBookmarked}); // return the reference to the new job bookmark or deleted job bookmark with the status
		});

	});

	app.get('/api/account/jobs/bookmarks', function (req, res, next) {

		var account = getAccount(req);
		account.populate('user.jobs.bookmarked').exec(function (err, acct) {
			if(err) return next(err);
			// TODO - handle edge case where there are no bookmarks and angular expects an array of objects
			res.send(acct.user.jobs.bookmarked);
		});

	});





}

exports.setup = setup;