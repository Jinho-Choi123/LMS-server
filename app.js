var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const classRouter = require('./routes/class');


const PORT = 8080;

const db = require('./db/db');
const dotenv = require('dotenv');
dotenv.config({ path: '/home/ubuntu/LMS-Server/.env' });

const cors = require('cors');
var app = express();

//allow cors
app.use(cors());

//connect to db
db();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/class', classRouter);

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

app.listen(PORT, () => {
    console.log(`Server Running at PORT: ${PORT}`);
})

module.exports = app;