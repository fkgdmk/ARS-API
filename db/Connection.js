const mongoose = require('mongoose');
const uri = 'mongodb+srv://admin:admin12345@cluster0-fobob.mongodb.net/db?retryWrites=true&w=majority';

const connectDB = async() => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        // console.log('database connected')
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;


