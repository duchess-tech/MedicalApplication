import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_DB
  if (!mongoUrl) {
  throw new Error("MONGO_DB environment variable is not set");}

  try {
    await mongoose.connect(
    mongoUrl      
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;
