var config = require('./config');

// Define some dummy data
// In real life, connect to a sql db
var orgname = config.orgname;
var footerHTML = config.footerHTML;
var partials = { header: '_header', footer: '_footer', menu: '_menu' };
var db = [
	{ 	
		slug: "home", 
		title: "Welcome", 
		footerHTML: footerHTML,
		orgname: orgname,
		body: "<p>Welcome to " + config.orgname + "!</p>",
		partials: partials
	},
	{ 	
		slug: "about", 
		title: "About", 
		footerHTML: footerHTML,
		orgname: orgname,
		body: "<p>About page</p>",
		partials: partials
	},
	{ 	
		slug: "contact", 
		title: "Contact", 
		footerHTML: footerHTML,
		orgname: orgname,
		body: "<p>Contact page</p>",
		partials: partials
	},
	{
		slug: "menu",
		items: [
			{ name: "home", href: "/", visibility: "all" },
			{ name: "about", href: "/#about", visibility: "public" },
			{ name: "contact", href: "/#contact", visibility: "public" },
			{ name: "login", href: "/login", visibility: "public" },
			{ name: "logout", href: "/logout", visibility: "private" }
		]
	}
];

// Search the db and serialize/return context for the view
// In real life, call a stored routine that returns the result set for the slug/id
db.getContext = function( slug ) {
	var result = [];
	for (i = 0; i < db.length; i++)
	{
		if (db[i].slug === slug)
		{
			result.push(db[i]);
		}
	}
	// if we have results, return the result...
	if (result.length > 0)
	{
		return result[0];
	}
	// otherwise, return "false" (no match found)
	else
	{
		return false;
	}
};

module.exports = db;