module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define(
		'User',
		{
			FirstName: Sequelize.DataTypes.STRING,
			LastName: Sequelize.DataTypes.STRING,
			Username: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			EncryptedPassword: {
				type: Sequelize.DataTypes.BLOB,
				allowNull: false,
			},
			Salt: {
				type: Sequelize.DataTypes.BLOB,
				allowNull: false,
			},
			Role: {
				type: Sequelize.DataTypes.STRING,
				defaultValue: 'User',
			},
		},
		{
			timestamps: false,
		}
	);
	//create relationships
	User.associate = function (models) {
		User.belongsToMany(models.Hotel, { through: models.Rate });
		User.belongsToMany(models.Room, { through: models.Reservation });
	};
	return User;
};
