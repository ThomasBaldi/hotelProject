const { sequelize } = require('../models');

class RoomService {
	constructor(db) {
		this.client = db.sequelize;
		this.Room = db.Room;
		this.Hotel = db.Hotel;
		this.Reservation = db.Reservation;
	}

	async create(capacity, pricePerDay, hotelId) {
		return this.Room.create({
			Capacity: capacity,
			PricePerDay: pricePerDay,
			HotelId: hotelId,
		}).catch((err) => {
			return err;
		});
	}

	async get(capacityCondition) {
		return this.Room.findAll({
			raw: true,
			nest: true,
			where: capacityCondition,
			include: {
				model: this.Hotel,
			},
		}).catch((err) => {
			return err;
		});
	}

	async getHotelRooms(hotelId) {
		return this.Room.findAll({
			where: {
				HotelId: hotelId,
			},
		}).catch((err) => {
			return err;
		});
	}

	async deleteRoom(roomId) {
		return this.Room.destroy({
			where: { id: roomId },
		}).catch((err) => {
			return err;
		});
	}

	async rentARoom(userId, roomId, startDate, endDate) {
		sequelize
			.query('CALL insert_reservation(:UserId, :RoomId, :StartDate, :EndDate)', {
				replacements: {
					RoomId: roomId,
					UserId: userId,
					StartDate: startDate,
					EndDate: endDate,
				},
			})
			.catch((err) => {
				return err;
			});
	}
}
module.exports = RoomService;
