var auth = {};

auth.users = [
    { id: 1, username: 'john', password: 'letmein', email: 'john@c3aero.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

auth.findById = function (id, fn) {
  var idx = id - 1;
  if (auth.users[idx]) {
    fn(null, auth.users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
};

auth.findByUsername = function (username, fn) {
  for (var i = 0, len = auth.users.length; i < len; i++) {
    var user = auth.users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
};

auth.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

auth.getAllUsers = function() {
	return auth.users;
};

module.exports = auth;