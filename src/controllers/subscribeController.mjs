import Subscriber from '../models/subscriberModel.mjs'; // adjust the path if needed
import sendMail from './mailController.mjs'

export const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email format is valid
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(409).json({ message: 'You have already subscribed.' });
    }

    // Create new subscriber
    const newSubscriber = new Subscriber({ email });
    let user = await newSubscriber.save();
    let payload = {
      email: user.email
    }
    sendMail({type: 1, payload });

    return res.status(201).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Subscribe Error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
