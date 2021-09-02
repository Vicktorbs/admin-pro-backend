const express = require('express');
const path = require('path');

require('dotenv').config();
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

// Public dir
app.use(express.static('public'))

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/medics', require('./routes/medics'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));

// SPA
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

// mongodb+srv://mers_user:EFQajuI2Tsdb2itP@cluster0.2hyuw.mongodb.net/
app.listen(process.env.PORT, () => {
    console.log('Sever listening on port ' + process.env.PORT);
})