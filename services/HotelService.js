class HotelService {
	constructor(db) {
		this.client = db.sequelize;
		this.Hotel = db.Hotel;
		console.log(db);
	}

	async create(name, location) {
		return this.Hotel.create({
			Name: name,
			Location: location,
		});
	}

	async get() {
		return this.Hotel.findAll({
			where: {},
		});
	}

	async deleteHotel(hotelId) {
		return this.Hotel.destroy({
			where: { id: hotelId },
		});
	}
}
module.exports = HotelService;
