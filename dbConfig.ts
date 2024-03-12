import mongoose from 'mongoose';

const mongoURI = "mongodb://app_user:app_password@localhost:27017/nextjsauth?authSource=admin&retryWrites=false";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
