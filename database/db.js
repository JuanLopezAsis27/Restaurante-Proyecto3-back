const mongoose = require('mongoose');
const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN)
        console.log("conectados a la base de datos");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnection;