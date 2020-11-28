const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

app.use(bodyParser.json());

dotenv.config();

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, () => console.log("Database Connected"));

app.use('/api', require('./routes')); 

app.listen(4000, () => console.log('API Listening on Port 4000.'));