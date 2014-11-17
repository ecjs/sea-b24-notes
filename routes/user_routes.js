var User = require('../models/user');
var authController = require('../controllers/auth');

module.exports = function(app) {
  app.post('/users', function(req, res) {
    var passwordLength = 6;
    if ((req.body.password == req.body.passwordConfirmed) && (req.body.password.length > passwordLength)) {
      var user = new User({
      username: req.body.username,
      password: req.body.password
    });
      user.save(function(err, data) {
      if (err) return res.send(err);
      res.json({'jwt': user.generateToken(app.get('jwtSecret'))});
    });
    }
    else {
      res.json({msg: 'passwords do not match, or password isnt long enough.'});
    }
  });
  app.get('/users', authController.isAuthenticated, function(req, res) {
    res.json({'jwt': req.user.generateToken(app.get('jwtSecret'))});
  });
};
