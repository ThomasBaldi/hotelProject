var express = require('express');
var router = express.Router();
var db = require('../models');
var UserService = require('../services/UserService');
var userService = new UserService(db);
const { Op } = require('sequelize');
var { canSeeUserList, checkIfAuthorized, isAdmin } = require('./authMiddlewares');

router.get('/', canSeeUserList, async function (req, res, next) {
	const { name } = req.query;
	const userRole = req.user?.role ?? undefined;
	const nameCondition = name ? { firstName: { [Op.like]: `%${name}%` } } : null;
	const users = await userService.getAll(nameCondition);
	res.render('users', { users: users, userRole });
});

router.delete('/', checkIfAuthorized, isAdmin, async function (req, res, next) {
	let id = req.body.id;
	await userService.deleteUser(id);
	res.end();
});

module.exports = router;
