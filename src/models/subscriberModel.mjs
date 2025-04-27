import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // each email must be unique
    lowercase: true,
    trim: true,
  }
}, { timestamps: true });

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

export default Subscriber;
