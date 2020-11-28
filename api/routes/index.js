const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyToken');

router.get('/', (req, res) => {
	res.json({
		code: 200,
		status: "OK",
		message: "API Online",
		data: []
	});
});

router.get('/me', auth, (req, res) => {
	res.json({
		code: 200,
		status: "OK",
		message: "Authentication Successful",
		data: [
			req.user
		]
	});
});

router.use('/auth', require('./auth')); 
router.use('/users', require('./users')); 

module.exports = router;