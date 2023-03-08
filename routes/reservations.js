var express = require('express');
var router = express.Router();
var db = require('../models');
var UserService = require('../services/UserService');
var userService = new UserService(db);
var { canSeeUserDetails, isAdmin } = require('./authMiddlewares');
const { Op } = require('sequelize');

router.get('/', isAdmin, async function (req, res, next) {
	const userRole = req.user?.role ?? undefined;
	const { name } = req.query;
	const nameCondition = name ? { firstName: { [Op.like]: `%${name}%` } } : null;
	const users = await userService.allReservations(nameCondition);
	res.render('reservations', { users: users, userRole });
});

router.get('/:userId', canSeeUserDetails, async function (req, res, next) {
	const user = await userService.getOne(req.params.userId);
	const userRole = req.user?.role ?? undefined;
	res.render('userReservation', { user: user, userRole });
});

module.exports = router;
