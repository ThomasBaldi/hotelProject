var express = require('express');
var router = express.Router();
var db = require('../models');
var UserService = require('../services/UserService');
var userService = new UserService(db);

//check if user logged in
canSeeUserDetails = (req, res, next) => {
	if (req.user != null)
		if (req.user.role === 'Admin' || req.user.id == req.params.userId) {
			next();
			return;
		}
	res.redirect('/login');
};

router.get('/:userId', canSeeUserDetails, async function (req, res, next) {
	const user = await userService.getOne(req.params.userId);
	res.render('userDetails', { user: user });
});

module.exports = router;
