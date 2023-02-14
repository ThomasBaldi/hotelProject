module.exports = (sequelize, Sequelize) => {
	const Reservation = sequelize.define(
		'Reservation',
		{
			StartDate: Sequelize.DataTypes.STRING,
			EndDate: Sequelize.DataTypes.STRING,
		},
		{
			timestamps: false,
			hasTrigger: true,
		}
	);
	return Reservation;
};
