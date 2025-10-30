// backend/models/Experience.js - UPDATED
import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: {
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
  maxSlots: {
    type: Number,
    required: true,
    min: 1
  },
  // Remove availableSlots from required fields since it's calculated dynamically
  availableSlots: {
    type: Number,
    default: function() {
      return this.maxSlots; // Default to maxSlots when created
    }
  }
});

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  duration: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  included: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  highlights: [{
    type: String
  }],
  slots: [slotSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
experienceSchema.index({ category: 1, isActive: 1 });
experienceSchema.index({ location: 1 });

export default mongoose.model('Experience', experienceSchema);