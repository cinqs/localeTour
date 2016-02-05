var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var packagejson = require("./package.json");

var routes = require('./routes/index');
var user = require('./routes/user');
var test = require('./routes/test');
var admin = require('./routes/admin/index');
var post  = require("./routes/post");
var adminPost = require("./routes/admin/post");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var system = require("./system");

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("secret"));

app.use(system.public.siteInfo);
app.use('/', routes);
app.use('/user', user);
app.use('/test', test);
app.use('/admin', admin);
app.use('/admin/post', adminPost);
app.use("/post", post);

//this line should below the 'public' static, since the public file would disrupt
//the route.
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

app.set("env", packagejson.env);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
