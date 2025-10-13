const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // const conn = await mongoose.connect(process.env.MONGODB_URI);
        const conn = await mongoose.connect(
            "mongodb://127.0.0.1:27017/SpeakWiseDB"
        );
        console.log("MongoDB Connection Status:");
        console.log(`- Connected to: ${conn.connection.host}`);
        console.log(`- Database: ${conn.connection.name}`);
        console.log(
            `- Status: ${
                conn.connection.readyState === 1 ? "Connected" : "Disconnected"
            }`
        );
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
