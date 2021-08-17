const express = require('express');
require('dotenv').config()
const { dbConnection } = require('./db/config');
const cors = require('cors');

// Server creation
const app = express();

// CORS configuration
app.use(cors());

// Lecture and body parse
app.use(express.json());

// Data base
dbConnection();

// Routes
app.use('/api/users', require('./routes/users'))

// mongodb+srv://mers_user:EFQajuI2Tsdb2itP@cluster0.2hyuw.mongodb.net/
app.listen(process.env.PORT, () => {
    console.log('Sever listening on port ' + process.env.PORT);
})