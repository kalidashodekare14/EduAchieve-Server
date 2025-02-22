const mongoose = require('mongoose')


const connectDB = async () => {
    if (!process.env.MONGODB_URL) {
        console.error("MONGBD_URL is not set in env ---");
        process.exit(1);
    }
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`)

    } catch (error) {
        console.errr(error);
        process.exit(1)
    }
}

module.exports = connectDB;