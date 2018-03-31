'use strict';

var createError     = require('http-errors');
const express 		  = require('express');
var path 			      = require('path');
var logger 			    = require('morgan');

const dbExec        = require('./database')('playDate');
const indexRouter   = require('./routes/index');
const loginRouter   = require('./routes/authenticate');
const Users         = require('./controllers/Users')(dbExec);

var cookieParser    = require('cookie-parser');
var LocalStrategy   = require('passport-local').Strategy;
var passport        = require('passport');
var session         = require('express-session');


var app = express();

// tell passport to use a local strategy and tell it how to validate a username and password
passport.use(new LocalStrategy(function(username, password, done) {
  Users.authenticate(username, password)
      .then(authenticated => {
          if (authenticated) {
              done(null, { username });
          } else {
              done(null, false);
          }
      })
      .catch(err => {
          done(err);  
      });
}));

// tell passport how to turn a user into serialized data that will be stored with the session
passport.serializeUser(function(user, done) {
  done(null, user.username);
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(id, done) {
  done(null, { username: id });
});

app.use(cookieParser());
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/authenticate', loginRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
