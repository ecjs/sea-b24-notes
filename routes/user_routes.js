'use strict';
var User = require('../models/user');
var authController = require('../controllers/auth');

module.exports = function(app) {
  app.post('/users', function(req, res) {
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });
    user.save(function(err) {
      if (err) res.send(err);

      res.json({message: 'New note user added!'});
    });
  });
  app.get('/users', authController.isAuthenticated, function(req, res) {
    User.find(function(err, users) {
      if (err) res.send(err);
      res.json(users);
    });
  });
};
