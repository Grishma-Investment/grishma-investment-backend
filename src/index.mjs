import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // 👈 import cors
import connectDB from './config.mjs';
import routes from './routes/index.mjs';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: [
    'https://rajeshthapa69.com.np',
    'https://www.rajeshthapa69.com.np',
    'https://admin.rajeshthapa69.com.np'
  ],
  credentials: true // 👈 if you need to send cookies/auth headers
}));

app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Optional: CORS test route (for debugging)
app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working properly.' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
