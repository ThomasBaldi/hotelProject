var express = require('express');
var router = express.Router();
var db = require('../models');
var UserService = require('../services/UserService');
var userService = new UserService(db);
var { canSeeUserDetails, isAdmin } = require('./authMiddlewares');

router.get('/', isAdmin, async function (req, res, next) {
	const users = await userService.allReservations();
	const userRole = req.user?.role ?? undefined;
	res.render('reservations', { users: users, userRole });
});

router.get('/:userId', canSeeUserDetails, async function (req, res, next) {
	const user = await userService.getOne(req.params.userId);
	const userRole = req.user?.role ?? undefined;
	res.render('userReservation', { user: user, userRole });
});

module.exports = router;
