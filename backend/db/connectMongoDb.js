import mongoose from 'mongoose';

export default async function connectMongoDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
}