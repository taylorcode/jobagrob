var handler = require('restify-errors'),
	Job = require('../schemas/job-model'),
	formatResponse = require('../plugins/response-formatter.js'),
	_ = require('underscore');



/// TOTOTOTOTOTO TODO!!!  - this should be merged with the passport deserialize
function getAccount (req) {
	return Account.findById(req.user._id).select('-password');
}

function isCompany (req, res, next) {
		return next();
	// req.account.select('company').exec(function (err, company) {
	// 	console.log(company);
	// 	return next();
	// });
}

function setup (app) {

	/* Create a job --*/
	app.post('/api/jobs', function (req, res, next) {

		var job = new Job(req.body),
			account = getAccount(req);

		job._creator = req.user._id; // add reference to user

		job.save(function (err, job) {
			if(err) return next(err);

			account.company.jobs.created.push(job); // add a reference to the job to the company

			account.save(function (err, account) {
				if(err) return next(err);
				res.send(job);
			});

		});

	});

	/* Find a job */
	app.get('/api/jobs/:id', function (req, res, next) {

		Job.findById(req.params.id, function (err, job) {
			if(err) return next(err);
			res.send(job);
		});
	});

	/* Search for a job */
	app.get('/api/jobs/search/:search', function (req, res, next) {

		var search = req.params.search;


		Job.textSearch(search, function (err, jobs) {
			res.send(jobs);
		});

	});

	/* Create application for job */
	app.post('/api/jobs/:id/generator', function (req, res, next) {
		
		var application = new Application(req.body);

		application.save(function (err, app) {

		    Job.findById(app.job, function (err, job) {
				if(err) return next(err);
				job.application = app;
		   		job.save(function (err, job) {
		   			if(err) return next(err);
		   			res.send(app);
		   		});
		    })

		})
	});

	/* Get current application for a job */
	app.get('/api/jobs/:id/application', function (req, res, next) {

		Job.findById(req.params.id)
		   .populate('application')
		   .exec(function (err, job) {
				if(err) return next(err);
				res.send(job.application);
		   });

	});


/*
	app.get('/api/jobs/application/:id', function (req, res, next) {

		Application.findById(req.params.id, function (err, app) {
			if(err) throw err; // TODO
			res.send(app);
		});

	});
*/

}

exports.setup = setup;