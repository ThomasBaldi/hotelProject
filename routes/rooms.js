var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var RoomService = require('../services/RoomService');
var db = require('../models');
var roomService = new RoomService(db);
var { checkIfAuthorized, isAdmin } = require('./authMiddlewares');

//allrooms
router.get('/', async function (req, res, next) {
	const rooms = await roomService.get();
	const userId = req.user?.id ?? 0;
	const userRole = req.user?.role ?? undefined;
	res.render('rooms', { rooms: rooms, userId, userRole });
});

//all rooms based on hotel
router.get('/:hotelId', async function (req, res, next) {
	const rooms = await roomService.getHotelRooms(req.params.hotelId);
	const userId = req.user?.id ?? 0;
	const userRole = req.user?.role ?? undefined;
	res.render('rooms', { rooms: rooms, userId, userRole });
});

//add room
router.post('/', isAdmin, jsonParser, async function (req, res, next) {
	let Capacity = req.body.Capacity;
	let PricePerDay = req.body.PricePerDay;
	let HotelId = req.body.HotelId;
	await roomService.create(Capacity, PricePerDay, HotelId);
	res.end();
});

//reserve a room
router.post('/reservation', checkIfAuthorized, jsonParser, async function (req, res, next) {
	let userId = req.body.UserId;
	let roomId = req.body.RoomId;
	let startDate = req.body.StartDate;
	let endDate = req.body.EndDate;
	await roomService.rentARoom(userId, roomId, startDate, endDate);
	res.end();
});

//delete room
router.delete('/', checkIfAuthorized, jsonParser, async function (req, res, next) {
	let id = req.body.id;
	await roomService.deleteRoom(id);
	res.end();
});

module.exports = router;
