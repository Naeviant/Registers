const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		status: 200,
		message: "API Online",
		data: []
	});
});

router.use('/users', require('./users')); 

module.exports = router;