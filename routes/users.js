var express = require('express');
var router = express.Router();
var auth = require('./auth');
var RELATIVE_PATH = "/users"

/* GET users listing. */
router.get('/', function(req, res) {
	console.log(req);
	auth.ensureAuthenticated(req, res,
		function() {
			res.send('respond with a resource');
	});
});

module.exports = router;
