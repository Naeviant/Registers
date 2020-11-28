const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	const token = req.header('authToken');
	if (!token) {
		return res.status(401).json({
			code: 401,
			status: "Unauthorized",
			message: "No Token Provided",
			data: []
		});
	}
	try	{
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch(err) {
		return res.status(400).json({
			code: 400,
			status: "Bad Request",
			message: "Invalid Token",
			data: []
		});
	}
}