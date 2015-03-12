(function() {
	'use strict'
    var express    = require('express'); 		// call express
	var app        = express(); 				// define our app using express
	var bodyParser = require('body-parser');
	var cpu = require('windows-cpu');
	var promise = require('promise');

	// configure app to use bodyParser()
	// this will let us get the data from a POST
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	var port = process.env.PORT || 8180; 		// set our port

	// ROUTES FOR OUR API
	// =============================================================================
	var router = express.Router(); 				// get an instance of the express Router
    var cpuInfo = promise.denodeify(cpu.cpuInfo);
    var findLoad = promise.denodeify(cpu.findLoad);

    var totalMemoryUsage = promise.denodeify(cpu.totalMemoryUsage);
	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	router.get('/memory-usage', function(req, res) {
		console.log('receiver call for memory-usage')
		totalMemoryUsage()
		.then(function(result) {
		    	res.json({ result: result });
		    	console.log('Finished call for memory-usage')	
		});	
	});


	router.get('/cpu-usage', function(req, res) {
		console.log('receiver call for cpu-usage')
		cpuInfo()
		.then(function(result) {
		    	res.json({ result: result });
		    	console.log('Finished call for cpu-usage')	
		});	
	});

	router.get('/cpu-usage/:processname', function(req, res) {
		console.log('receiver call for cpu-usage for process' + req.params.processname)
		findLoad(req.params.processname)
		.then(function(result) {
		    	res.json({ result: result });
		    	console.log('Finished call for cpu-usage for process' + req.params.processname)	
		});	
	});

	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
	app.use('/api', router);

	// START THE SERVER
	// =============================================================================
	app.listen(port);
	console.log('Listening on port ' + port);

}());