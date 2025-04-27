import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Remove useNewUrlParser and useUnifiedTopology as they are no longer needed
    await mongoose.connect('mongodb://localhost:27017/grishma-investment');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
