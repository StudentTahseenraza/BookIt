// backend/controllers/experienceController.js - UPDATED
import Experience from '../models/Experience.js';
import Booking from '../models/Booking.js';

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: true })
      .select('-slots -fullDescription -highlights')
      .sort({ createdAt: -1 });

    res.json(experiences);
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching experiences'
    });
  }
};

// @desc    Get single experience with dynamic slot availability
// @route   GET /api/experiences/:id
// @access  Public
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience || !experience.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    // Calculate dynamic slot availability based on actual bookings
    const experienceWithDynamicSlots = await calculateDynamicSlotAvailability(experience);

    res.json(experienceWithDynamicSlots);
  } catch (error) {
    console.error('Get experience error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching experience'
    });
  }
};

// Helper function to calculate real-time slot availability
const calculateDynamicSlotAvailability = async (experience) => {
  const slotsWithAvailability = await Promise.all(
    experience.slots.map(async (slot) => {
      // Count actual bookings for this slot
      const bookedCount = await Booking.countDocuments({
        experienceId: experience._id,
        slotDate: {
          $gte: new Date(new Date(slot.date).setHours(0, 0, 0, 0)),
          $lt: new Date(new Date(slot.date).setHours(23, 59, 59, 999))
        },
        startTime: slot.startTime,
        status: { $ne: 'cancelled' }
      });

      const availableSlots = Math.max(0, slot.maxSlots - bookedCount);
      
      return {
        ...slot.toObject(),
        availableSlots,
        date: slot.date.toISOString().split('T')[0] // Format date for frontend
      };
    })
  );

  // Convert to plain object and update slots
  const experienceObj = experience.toObject();
  experienceObj.slots = slotsWithAvailability;
  
  return experienceObj;
};