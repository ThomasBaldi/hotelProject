var express = require('express');
var router = express.Router();
var HotelService = require('../services/HotelService');
var db = require('../models');
var hotelService = new HotelService(db);
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var { checkIfAuthorized, isAdmin } = require('./authMiddlewares');

/* GET hotels listing. */
router.get('/', async function (req, res, next) {
	const hotels = await hotelService.get();
	const userRole = req.user?.role ?? undefined;
	res.render('hotels', { hotels: hotels, user: req.user, userRole });
});

//show details of hotel
router.get('/:hotelId', async function (req, res, next) {
	const userId = req.user?.id ?? 0;
	const userRole = req.user?.role ?? undefined;
	const hotel = await hotelService.getHotelDetails(req.params.hotelId, userId);
	res.render('hotelDetails', { hotel: hotel, userId, userRole, user: req.user });
});

//add hotels
router.post('/', checkIfAuthorized, isAdmin, jsonParser, async function (req, res, next) {
	let Name = req.body.Name;
	let Location = req.body.Location;
	await hotelService.create(Name, Location);
	res.end();
});

//rate hotel
router.post('/:hotelId/rate', checkIfAuthorized, jsonParser, async function (req, res, next) {
	let value = req.body.Value;
	const userId = req.body.UserId;
	await hotelService.makeARate(userId, req.params.hotelId, value);
	res.end();
});

//delete hotels
router.delete('/', isAdmin, jsonParser, async function (req, res, next) {
	let id = req.body.id;
	await hotelService.deleteHotel(id);
	res.end();
});

module.exports = router;
