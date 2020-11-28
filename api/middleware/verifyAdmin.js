const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	if (req.user.admin) {
		next();
	}
	else {
		return res.status(403).json({
			code: 403,
			status: "Forbidden",
			message: "You Cannot Perform This Action",
			data: []
		});
	}
}