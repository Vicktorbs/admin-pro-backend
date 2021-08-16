const mongoose = require('mongoose');
require('dotenv').config()

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB connected');
    } catch (error) {
        console.log(error);
        throw new Error('Errror connectin to the DB')
    }

}

module.exports = {
    dbConnection
}