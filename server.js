(function() {
	'use strict'
    var express    = require('express'); 		// call express
	var app        = express(); 				// define our app using express
	var bodyParser = require('body-parser');
	var monitoringRouter = require('./monitoringroutes.js')

	// configure app to use bodyParser()
	// this will let us get the data from a POST
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	var port = process.env.PORT || 8180; 		// set our port

	var router = express.Router();
    var myrouter = new monitoringRouter();
    myrouter.setup(router);

	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
	app.use('/api', router);

	// START THE SERVER
	// =============================================================================
	app.listen(port);
	console.log('Listening on port ' + port);

}());