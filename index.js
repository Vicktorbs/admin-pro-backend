const express = require('express');
const { dbConnection } = require('./db/config');

// Server creation
const app = express();

// Data base
dbConnection();

// mongodb+srv://mers_user:EFQajuI2Tsdb2itP@cluster0.2hyuw.mongodb.net/
app.listen(3000, () => {
    console.log('Sever listening on port ' + 3000);
})