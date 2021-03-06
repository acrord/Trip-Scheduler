var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var session = require('express-session');
// const FileStore = require('session-file-store')(session);
var logger = require('morgan'); ///log정보 확인


var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
var groupsRouter = require('./server/routes/groups')

var app = express();

//HTTP 접근 제어(CROS) 처리
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
// app.use(session({
//   secret: '!@#$%^&*',
//   resave: false,
//   saveUninitialized :true,
//   store: new FileStore()
//   })
// );

app.use('/', indexRouter);
app.use('/:users', usersRouter);
app.use('/:users/:groups', groupsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
