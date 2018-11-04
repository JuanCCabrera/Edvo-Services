const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var plansRouter = require('./routes/plans');
var teacherRouter = require('./routes/teacher');
var mentorRouter = require('./routes/mentor');
var adminRouter = require('./routes/admin');
var schoolRouter = require('./routes/school');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/plans', plansRouter);
app.use('/teacher', teacherRouter);
app.use('/mentor', mentorRouter);
app.use('/admin', adminRouter);
app.use('/school', schoolRouter);

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
