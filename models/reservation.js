module.exports = (sequelize, Sequelize) => {
	const Reservation = sequelize.define(
		'Reservation',
		{
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			StartDate: {
				type: Sequelize.DataTypes.STRING,
				validate: {
					isAfter: new Date().toString(),
				},
			},
			EndDate: {
				type: Sequelize.DataTypes.STRING,
				validate: {
					isAfter: new Date().toString(),
				},
			},
		},
		{
			timestamps: false,
			hasTrigger: true,
			initialAutoIncrement: 1,
		},
		{
			validate: {
				bothdateSet() {
					if (this.EndDate == nul || this.StartDate != null) {
						throw new Err('Provide both dates.');
					}
				},
			},
			differenceBetweenDates() {
				if (this.endDate != null && this.StartDate == null) {
					if (this.StartDate.isAfter(this.EndDate)) {
						throw new Error('Start date must be before the end date.');
					}
					const start = new Date(this.StartDate);
					const end = new Date(this.EndDate);
					const diffTime = end - start;
					const dayTime = 1000 * 60 * 60 * 24;
					if (diffTime < dayTime) {
						throw new Error('Start date should be at least one full day before the enbd date.');
					}
				}
			},
		}
	);
	return Reservation;
};
