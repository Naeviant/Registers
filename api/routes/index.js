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

const faker = require("faker");
router.get('/data', (req, res) => {
	data = [];
	for (var i = 0; i < 30; i++) {
		data.push({
			id: faker.random.uuid(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName()
		});
	}
	data.sort(function(a, b) {
	    var textA = a.lastName.toUpperCase();
	    var textB = b.lastName.toUpperCase();
	    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});
	res.json(data);
});

router.use('/auth', require('./auth')); 
router.use('/users', require('./users'));

module.exports = router;