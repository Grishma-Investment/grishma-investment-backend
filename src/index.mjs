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
  origin: 'https://admin.rajeshthapa69.com.np', // Allow requests only from this domain
})); 

app.use(bodyParser.json());

// Routes
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
