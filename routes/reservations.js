var express = require('express');
var router = express.Router();
var db = require('../models');
var UserService = require('../services/UserService');
var userService = new UserService(db);
var {
	canSeeUserList,
	canSeeUserDetails,
	checkIfAuthorized,
	isAdmin,
} = require('./authMiddlewares');

router.get('/', isAdmin, async function (req, res, next) {
	const users = await userService.allReservations();
	res.render('reservations', { users: users });
});

router.get('/:userId', canSeeUserDetails, async function (req, res, next) {
	const user = await userService.getOne(req.params.userId);
	res.render('userReservation', { user: user });
});

module.exports = router;
