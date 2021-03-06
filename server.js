var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();
var passport = require('passport');
var authController = require('./controllers/auth');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(passport.initialize());

app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');
var jwtauth = require('./controllers/jwt_auth')(app.get('jwtSecret'));
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/notes_development');

require('./routes/notes_routes')(app, jwtauth);
require('./routes/user_routes')(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
