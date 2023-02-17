var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hotelsRouter = require('./routes/hotels');
var roomsRouter = require('./routes/rooms');
var authRouter = require('./routes/auth');
var reservRouter = require('./routes/reservations');

var db = require('./models');
db.sequelize.sync({ force: false });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		secret: 'random text',
		resave: false,
		saveUninitialized: false,
		store: new SQLiteStore(),
	})
);
app.use(passport.authenticate('session'));

//allow for user and !user to be available across the app to change navbar look
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hotels', hotelsRouter);
app.use('/rooms', roomsRouter);
app.use('/', authRouter);
app.use('/reservations', reservRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
