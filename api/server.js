const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DATABASE_CONNECTION, () => console.log("Database Connected"));

app.use('/api', require('./routes')); 

app.listen(4000, () => console.log('API Listening on Port 4000.'));