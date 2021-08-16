const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect('mongodb+srv://mers_user:EFQajuI2Tsdb2itP@cluster0.2hyuw.mongodb.net/hospitaldb', {
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