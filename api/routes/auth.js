const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require("../models/UserModel.js");

router.post('/', (req, res) => {
	
});

router.delete('/:id', (req, res) => {

});

module.exports = router;