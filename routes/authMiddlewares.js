module.exports = {
	checkIfAuthorized: function (req, res, next) {
		if (req.user == null) {
			res.status(401).send(new Error());
			return;
		}
		if (req.user.role == 'Admin' || req.user.role == 'User') next();
	},
};
