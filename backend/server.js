// backend/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Route imports
import experienceRoutes from './routes/experienceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import promoRoutes from './routes/promoRoutes.js';

// Middleware imports
import errorHandler from './middleware/errorHandler.js';
import { generalLimiter, bookingLimiter } from './middleware/rateLimiter.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security headers
app.use(helmet());

// Rate limiting
app.use(generalLimiter);

// CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'https://your-frontend-domain.vercel.app', // Replace with your actual frontend URL
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingLimiter, bookingRoutes);
app.use('/api/promo', promoRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Booklt API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handler middleware
app.use(errorHandler);

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', err);
  server.close(() => {
    process.exit(1);
  });
});