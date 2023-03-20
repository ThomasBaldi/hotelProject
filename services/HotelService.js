class HotelService {
	constructor(db) {
		this.client = db.sequelize;
		this.Hotel = db.Hotel;
		this.Rating = db.Rating;
		this.User = db.User;
	}

	async create(name, location) {
		return this.Hotel.create({
			Name: name,
			Location: location,
		});
	}

	async get(locationCondition) {
		return this.Hotel.findAll({
			where: locationCondition,
		});
	}

	async deleteHotel(hotelId) {
		return this.Hotel.destroy({
			where: { id: hotelId },
		});
	}

	async getHotelDetails(hotelId, userId) {
		const hotel = await this.Hotel.findOne({
			where: {
				id: hotelId,
			},
			include: {
				model: this.User,
				through: {
					attributes: ['Value'],
				},
			},
		});
		hotel.avg =
			hotel.Users.map((x) => x.Rating.dataValues.Value).reduce((a, b) => a + b, 0) /
			hotel.Users.length;
		hotel.rated = hotel.Users.filter((x) => x.dataValues.id == userId).length > 0;
		return hotel;
	}

	async giveRating(userId, hotelId, value) {
		return this.Rating.create({
			UserId: userId,
			HotelId: hotelId,
			Value: value,
		});
	}

	async getBestRate() {
		return await this.Rating.findOne({
			order: [['Value', 'Desc']],
		});
	}
}
module.exports = HotelService;
