module.exports = (sequelize, Sequelize) => {
	const Rating = sequelize.define(
		'Rating',
		{
			Value: {
				type: Sequelize.DataTypes.INTEGER,
				validate: {
					min: 1,
					max: 5,
				},
			},
		},
		{
			timestamps: false,
		}
	);
	return Rating;
};
