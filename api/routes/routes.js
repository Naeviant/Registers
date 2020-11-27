const express = require('express');
const router = express.Router();

router.post('/auth/', (req, res) => {
	res.sendStatus(200);
});

module.exports = router;