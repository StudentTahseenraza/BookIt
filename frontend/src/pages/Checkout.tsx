// frontend/src/pages/Checkout.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ExperienceDetail, Slot, PromoValidation } from '../types';
import { ArrowLeft, User, Mail, Users, Ticket, Shield, Check } from 'lucide-react';

interface CheckoutForm {
  userName: string;
  userEmail: string;
  participants: number;
  promoCode: string;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience, selectedSlot, selectedDate } = location.state as {
    experience: ExperienceDetail;
    selectedSlot: Slot;
    selectedDate: string;
  };

  const [promoValidation, setPromoValidation] = useState<PromoValidation | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    defaultValues: {
      participants: 1,
    },
  });

  const participants = watch('participants', 1);
  const basePrice = experience.price * participants;
  const discount = promoValidation?.discountAmount || 0;
  const totalPrice = basePrice - discount;

  const validatePromoCode = async (code: string) => {
    if (!code) {
      setPromoValidation(null);
      setAppliedPromo('');
      return;
    }

    setIsValidatingPromo(true);
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('https://bookit-91pz.onrender.com/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoCode: code, amount: basePrice }),
      });
      const validation: PromoValidation = await response.json();
      setPromoValidation(validation);
      if (validation.isValid) {
        setAppliedPromo(code);
      }
    } catch (error) {
      setPromoValidation({ isValid: false, discountAmount: 0, discountType: 'fixed', finalPrice: basePrice });
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const onSubmit = async (data: CheckoutForm) => {
    try {
      const bookingData = {
        experienceId: experience._id,
        slotDate: selectedDate,
        userName: data.userName,
        userEmail: data.userEmail,
        participants: data.participants,
        promoCode: appliedPromo || undefined,
        totalPrice,
      };

      // TODO: Replace with actual API endpoint
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        navigate('/booking-result', { state: { success: true, bookingData } });
      } else {
        navigate('/booking-result', { state: { success: false } });
      }
    } catch (error) {
      navigate('/booking-result', { state: { success: false } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center mb-8"
        >
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </motion.button>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Complete Your Booking
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Your Information</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register('userName', { required: 'Name is required' })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Enter your full name"
                  />
                  {errors.userName && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.userName.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('userEmail', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Enter your email"
                  />
                  {errors.userEmail && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.userEmail.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Participants Field */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    Number of Participants
                  </label>
                  <select
                    {...register('participants', {
                      min: { value: 1, message: 'At least 1 participant required' },
                      max: { value: 10, message: 'Maximum 10 participants' },
                    })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Promo Code Field */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Ticket className="w-4 h-4 mr-2" />
                    Promo Code
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      {...register('promoCode')}
                      onChange={(e) => validatePromoCode(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter promo code"
                    />
                  </div>
                  <AnimatePresence>
                    {isValidatingPromo && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-blue-500 text-sm mt-1"
                      >
                        Validating promo code...
                      </motion.p>
                    )}
                    {promoValidation && !isValidatingPromo && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`text-sm mt-1 ${
                          promoValidation.isValid ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {promoValidation.isValid
                          ? `Promo code applied! Discount: $${promoValidation.discountAmount}`
                          : 'Invalid promo code'}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Confirm Booking
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8">
              {/* Experience Card */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
                <div className="relative h-32">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{experience.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{new Date(selectedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{selectedSlot.startTime} - {selectedSlot.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participants:</span>
                      <span>{participants}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white rounded-3xl shadow-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Price Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Base Price (×{participants})</span>
                    <span>${basePrice}</span>
                  </div>
                  {appliedPromo && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex justify-between text-green-500"
                    >
                      <span>Promo Discount ({appliedPromo})</span>
                      <span>-${discount}</span>
                    </motion.div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="bg-green-50 rounded-2xl p-4 mt-6 text-center border border-green-200"
              >
                <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-green-700 font-medium">
                  Secure SSL Encryption
                </p>
                <p className="text-xs text-green-600">
                  Your payment information is protected
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;