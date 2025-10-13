const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const User = require("../models/User");
const AnalysisReport = require("../models/AnalysisReport");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

const setupDatabase = async () => {
    try {
        await connectDB();

        console.log("Setting up database...");

        // Create indexes for better performance
        await User.createIndexes();
        await AnalysisReport.createIndexes();

        console.log("Database indexes created");

        // Create a sample user for testing (optional)
        const existingUser = await User.findOne({
            email: "demo@speakwise.com",
        });
        if (!existingUser) {
            const demoUser = new User({
                name: "Demo User",
                email: "demo@speakwise.com",
                password: "demo123", // This will be hashed automatically
            });

            await demoUser.save();
            console.log("Demo user created: demo@speakwise.com / demo123");
        } else {
            console.log("Demo user already exists");
        }

        console.log("Database setup completed successfully!");
    } catch (error) {
        console.error("Database setup failed:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed");
    }
};

// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase();
}

module.exports = setupDatabase;
