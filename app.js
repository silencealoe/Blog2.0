var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userloginRouter = require('./routes/userlogin');
var userregisterRouter = require('./routes/userregister');
var blogRouter = require('./routes/blog');
var userInfoRouter = require('./routes/userInfo');
var detailRouter = require('./routes/detail');
var personInfoRouter = require('./routes/personInfo');
var otherInfoRouter = require('./routes/otherInfo');
var revisePsdRouter = require('./routes/revisepassword');
var session = require('express-session');
var app = express();

//database
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/RoadBlog");
// view engine setup
//http://47.95.11.102:3
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
	name:"atroadblogID",
	secret:"xi1221321",
	cookie:{maxAge:2000*3600},
	resave:true,
	saveUninitialized:true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userlogin',userloginRouter);
app.use('/userregister',userregisterRouter);
app.use('/blog',blogRouter);
app.use('/userInfo',userInfoRouter);
app.use('/detail',detailRouter);
app.use('/personInfo',personInfoRouter);
app.use('/otherInfo',otherInfoRouter);
app.use('/revisepassword',revisePsdRouter);


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
