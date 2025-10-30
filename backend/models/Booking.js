// backend/models/Booking.js - UPDATED
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  slotDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  userEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  participants: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  promoCode: {
    type: String,
    trim: true
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  bookingReference: {
    type: String,
    unique: true
    // Removed required: true since it's auto-generated
  }
}, {
  timestamps: true
});

// Generate unique booking reference - only if not provided
bookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    this.bookingReference = 'BLT' + Date.now().toString(36).toUpperCase() + 
      Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

// Single index definition (removed duplicate)
bookingSchema.index({ bookingReference: 1 }, { unique: true });
bookingSchema.index({ userEmail: 1, createdAt: -1 });
bookingSchema.index({ experienceId: 1, slotDate: 1 });

export default mongoose.model('Booking', bookingSchema);