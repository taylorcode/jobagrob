var formatResponse = require('./plugins/response-formatter.js'),
    accountRoutes = require('./routes/account-routes.js'),
    jobRoutes = require('./routes/job-routes.js');

function setup (app) {

	accountRoutes.setup(app);
	jobRoutes.setup(app);
}
 
exports.setup = setup;