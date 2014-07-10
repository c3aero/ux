var express = require('express');
var router = express.Router();
var config = require('./config');
var db = require('./db');

/* GET home page. */
router.get('/', function(req, res) {
  var context = db.getContext('home');
  if (isLoggedIn(req))
  {
	context.menu = filterContext(db.getContext('menu').items, req);
  	context.user = req.user;
  }
  else
  {
	context.menu = filterContext(db.getContext('menu').items, req);
	context.user = null;
  }
  res.render('index', context);
});

/* Is the user logged in? */
function isLoggedIn(req) {
	if (typeof(req.user) != 'undefined') {
		return true;
	}
	else
	{
		return false;
	}
}

/* Filter the menu based on the visibility field in the db & req object */
function filterContext(datacontext,req) {
	var newcontext = [];
	for (i = 0; i < datacontext.length; i++)
	{
		if (isLoggedIn(req)) {
			if (datacontext[i].visibility === "private" || datacontext[i].visibility === "all")
			{
				newcontext.push(datacontext[i]);
			}
		}
		else {
			if (datacontext[i].visibility === "public" || datacontext[i].visibility === "all")
			{
				newcontext.push(datacontext[i]);
			}
		}
	}
	return newcontext;
}

/*
function merge(obj1, obj2) {
	var obj3 = {};
	for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	return obj3;
}*/

module.exports = router;
