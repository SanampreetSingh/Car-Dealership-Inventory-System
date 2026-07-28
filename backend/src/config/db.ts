import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI environment variable is not defined in the backend/.env file.');
    }

    // Attempt to connect to MongoDB
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Narrowing the error type for strict TypeScript adherence
    const errorMessage = error instanceof Error ? error.message : 'Unknown connection error';
    console.error(`Error connecting to MongoDB: ${errorMessage}`);
    
    // Exit process with failure code (1) if the database connection fails
    process.exit(1);
  }
};

export default connectDB;