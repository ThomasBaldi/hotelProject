module.exports = (sequelize, Sequelize) => {
	const Reservation = sequelize.define(
		'Reservation',
		{
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
						throw new Error('Start date ,ust be before the end date.');
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
		},
		{
			timestamps: false,
			hasTrigger: true,
		}
	);
	return Reservation;
};
