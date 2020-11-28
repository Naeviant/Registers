const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		code: 200,
		status: "OK",
		message: "API Online",
		data: []
	});
});

router.use('/auth', require('./auth')); 
router.use('/users', require('./users')); 

module.exports = router;