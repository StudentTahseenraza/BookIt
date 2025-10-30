// backend/controllers/bookingController.js
import Booking from '../models/Booking.js';
import Experience from '../models/Experience.js';
import { validatePromoCodeLogic } from './promoController.js';

// @desc    Create new booking with double-booking prevention
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const {
      experienceId,
      slotDate,
      userName,
      userEmail,
      participants,
      promoCode
    } = req.body;

    // Validate required fields
    if (!experienceId || !slotDate || !userName || !userEmail || !participants) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Get experience
    const experience = await Experience.findById(experienceId).session(session);
    if (!experience || !experience.isActive) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    // Find the selected slot
    const selectedSlot = experience.slots.find(slot => 
      new Date(slot.date).toISOString().split('T')[0] === new Date(slotDate).toISOString().split('T')[0]
    );

    if (!selectedSlot) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'Selected slot not available'
      });
    }

    // Check current bookings for this slot (with transaction)
    const currentBookings = await Booking.countDocuments({
      experienceId,
      slotDate: {
        $gte: new Date(new Date(slotDate).setHours(0, 0, 0, 0)),
        $lt: new Date(new Date(slotDate).setHours(23, 59, 59, 999))
      },
      startTime: selectedSlot.startTime,
      status: { $ne: 'cancelled' }
    }).session(session);

    const availableSlots = selectedSlot.maxSlots - currentBookings;
    
    if (participants > availableSlots) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: `Only ${availableSlots} slots available for this time`
      });
    }

    // Calculate pricing
    const basePrice = experience.price * participants;
    let finalPrice = basePrice;
    let discountAmount = 0;

    if (promoCode) {
      const promoValidation = await validatePromoCodeLogic(promoCode, basePrice);
      if (promoValidation.isValid) {
        finalPrice = promoValidation.finalPrice;
        discountAmount = promoValidation.discountAmount;
      } else {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: promoValidation.message || 'Invalid promo code'
        });
      }
    }

    // Create booking within transaction
    const booking = new Booking({
      experienceId,
      slotDate: new Date(slotDate),
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      userName,
      userEmail,
      participants,
      totalPrice: finalPrice,
      promoCode: promoCode || undefined,
      discountAmount
    });

    const savedBooking = await booking.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Populate experience details for response
    await savedBooking.populate('experienceId', 'title location image duration');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: savedBooking
    });

  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();
    
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking'
    });
  }
};

// @desc    Get booking by reference
// @route   GET /api/bookings/:reference
// @access  Public
export const getBookingByReference = async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      bookingReference: req.params.reference 
    }).populate('experienceId', 'title location image duration');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
};