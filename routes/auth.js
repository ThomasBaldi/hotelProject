var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../models');
var UserService = require('../services/UserService');
var userService = new UserService(db);

var router = express.Router();

passport.use(
	new LocalStrategy(function verify(username, password, cb) {
		userService.getOneByName(username).then((data) => {
			if (data === null) {
				return cb(null, false, { message: 'Incorrect username or password.' });
			}
			crypto.pbkdf2(password, data.Salt, 310000, 32, 'sha256', function (err, hashedPassword) {
				if (err) {
					return cb(err);
				}
				if (!crypto.timingSafeEqual(data.EncryptedPassword, hashedPassword)) {
					return cb(null, false, { message: 'Incorrect username or password.' });
				}
				return cb(null, data);
			});
		});
	})
);

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, { id: user.id, username: user.Username, role: user.Role });
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

router.get('/login', function (req, res, next) {
	res.render('login', { user: req.user });
});

router.post(
	'/login/password',
	passport.authenticate('local', {
		successReturnToOrRedirect: '/hotels',
		failureRedirect: '/login',
		failureMessage: true,
	})
);

router.post('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/login');
	});
});

router.get('/signup', function (req, res, next) {
	res.render('signup');
});

router.post('/signup', function (req, res, next) {
	var salt = crypto.randomBytes(16);
	crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
		if (err) {
			return next(err);
		}
		userService.create(
			req.body.firstname,
			req.body.lastname,
			req.body.username,
			salt,
			hashedPassword
		);
		res.redirect('/login');
	});
});

module.exports = router;
