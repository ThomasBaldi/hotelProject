var express = require('express');
var router = express.Router();
var db = require('../models');
var UserService = require('../services/UserService');
var userService = new UserService(db);
var { canSeeUserDetails } = require('./authMiddlewares');

router.get('/:userId', canSeeUserDetails, async function (req, res, next) {
	const user = await userService.getOne(req.params.userId);
	res.render('userDetails', { user: user });
});

module.exports = router;
