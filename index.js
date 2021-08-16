const express = require('express');
require('dotenv').config()
const { dbConnection } = require('./db/config');
const cors = require('cors');

// Server creation
const app = express();

// CORS configuration
app.use(cors());

// Data base
dbConnection();

// mongodb+srv://mers_user:EFQajuI2Tsdb2itP@cluster0.2hyuw.mongodb.net/
app.listen(process.env.PORT, () => {
    console.log('Sever listening on port ' + process.env.PORT);
})