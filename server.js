(function() {
	'use strict'
    var express    = require('express'); 		// call express
	var app        = express(); 				// define our app using express
	var bodyParser = require('body-parser');
	var router = require('./myroutes')

	// configure app to use bodyParser()
	// this will let us get the data from a POST
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	var port = process.env.PORT || 8180; 		// set our port

	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
	app.use('/api', router);

	// START THE SERVER
	// =============================================================================
	app.listen(port);
	console.log('Listening on port ' + port);

}());