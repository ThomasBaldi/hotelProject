var express = require('express');
var router = express.Router();
var db = require('../models');
var HotelService = require('../services/HotelService');
var hotelService = new HotelService(db);
var { checkIfAuthorized, isAdmin } = require('./authMiddlewares');
const { Op } = require('sequelize');

/* GET hotels listing. */
router.get('/', async function (req, res, next) {
	const { location } = req.query;
	const userRole = req.user?.role ?? undefined;
	const locationCondition = location ? { location: { [Op.like]: `%${location}%` } } : null;
	const hotels = await hotelService.get(locationCondition);
	res.render('hotels', { hotels: hotels, user: req.user, userRole });
});

//show details of hotel
router.get('/:hotelId', async function (req, res, next) {
	const userId = req.user?.id ?? 0;
	const userRole = req.user?.role ?? undefined;
	const hotel = await hotelService.getHotelDetails(req.params.hotelId, userId);
	res.render('hotelDetails', { hotel: hotel, userId, user: req.user, userRole });
});

//add hotels
router.post('/', checkIfAuthorized, isAdmin, async function (req, res, next) {
	let Name = req.body.Name;
	let Location = req.body.Location;
	await hotelService.create(Name, Location);
	res.end();
});

//rating hotel
router.post('/:hotelId/rating', checkIfAuthorized, async function (req, res, next) {
	let value = req.body.Value;
	const userId = req.body.UserId;
	await hotelService.giveRating(userId, req.params.hotelId, value);
	res.end();
});

//delete hotels
router.delete('/', isAdmin, async function (req, res, next) {
	let id = req.body.id;
	await hotelService.deleteHotel(id);
	res.end();
});

module.exports = router;
