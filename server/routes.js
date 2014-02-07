var Job = require('./schemas/job-model'),
    Application = require('./schemas/application-model'),
    accountRoutes = require('./routes/account-routes.js'),
	formatResponse = require('./plugins/response-formatter.js');

function setup (app) {


	accountRoutes.setup(app);

	/* Create a job -- on client it is "jobs/new" */
	app.post('/api/jobs', function (req, res, next) {

		var job = new Job(req.body);

		console.log(job);

		job.save(function (err, job) {
			if(err) console.log(err)
			if(err) return next(err);
			res.send(job);
		});

	});

	/* Find a job */
	app.get('/api/jobs/:id', function (req, res, next) {

		Job.findById(req.params.id, function (err, job) {
			if(err) return next(err);
			res.send(job);
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