module.exports = (sequelize, Sequelize) => {
	const Room = sequelize.define(
		'Room',
		{
			PricePerDay: Sequelize.DataTypes.STRING,
			Capacity: Sequelize.DataTypes.STRING,
		},
		{
			timestamps: false,
		}
	);
	//create relationships
	Room.associate = function (models) {
		Room.belongsTo(models.Hotel);
		Room.belongsToMany(models.User, { through: models.Reservation });
	};
	return Room;
};
