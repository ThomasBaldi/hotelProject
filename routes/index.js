var express = require('express');
var router = express.Router();
var db = require('../models');
var HotelService = require('../services/HotelService');
var hotelService = new HotelService(db);
var UserService = require('../services/UserService');
var userService = new UserService(db);

router.get('/', async (req, res, next) => {
	if (req.user) {
		const user = await userService.getOne(req.user.id);
		const rate = await hotelService.getBestRate();
		const hotel = await hotelService.getHotelDetails(rate.HotelId, null);
		if (rate === null) {
			next(createError(404));
			return;
		}
		if (hotel === null) {
			next(createError(404));
			return;
		}
		const userRole = req.user?.role ?? undefined;
		res.render('index', { user: user, hotel: hotel, userRole });
	} else {
		const rate = await hotelService.getBestRate();
		const hotel = await hotelService.getHotelDetails(rate.HotelId, null);
		if (rate === null) {
			next(createError(404));
			return;
		}
		if (hotel === null) {
			next(createError(404));
			return;
		}
		const userRole = req.user?.role ?? undefined;
		res.render('index', { hotel: hotel, userRole });
	}
});

module.exports = router;
