var express = require('express');
var router = express.Router();
var db = require('../models');
var UserService = require('../services/UserService');
var userService = new UserService(db);

userIsAdmin = (req, res, next) => {
	if (req.user != null)
		if (req.user.role === 'Admin') {
			next();
			return;
		}
	res.redirect('/login');
};

router.get('/', userIsAdmin, async function (req, res, next) {
	const users = await userService.allReservations();
	res.render('reservations', { users: users });
});

module.exports = router;
