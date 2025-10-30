// frontend/src/pages/ExperienceDetails.tsx - FIXED
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ExperienceDetail, Slot } from '../types'; // Changed import
import { Star, MapPin, Clock, Users, Calendar, ArrowLeft, Check } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

// Component name remains the same, but we use ExperienceDetail interface
const ExperienceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<ExperienceDetail | null>(null); // Changed type
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
  const fetchExperience = async () => {
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch(`http://localhost:5000/api/experiences/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch experience');
      }
      
      const data = await response.json();
      setExperience(data);
      if (data.slots && data.slots.length > 0) {
        setSelectedDate(data.slots[0].date);
      }
    } catch (err) {
      console.error('Failed to load experience details:', err);
      // Fallback to mock data
      const { mockExperienceDetails } = await import('../data/mockData');
      if (id && mockExperienceDetails[id]) {
        setExperience(mockExperienceDetails[id]);
        if (mockExperienceDetails[id].slots.length > 0) {
          setSelectedDate(mockExperienceDetails[id].slots[0].date);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  fetchExperience();
}, [id]);

  const availableSlots = experience?.slots.filter(slot => slot.date === selectedDate) || [];

  const handleBookNow = () => {
    if (selectedSlot) {
      navigate('/checkout', {
        state: {
          experience,
          selectedSlot,
          selectedDate
        }
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!experience) return <div className="text-center text-red-500 mt-8">Experience not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white"
    >
      {/* Header with Back Button */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b"
      >
        <div className="container mx-auto px-4 py-4">
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Experiences
          </motion.button>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Image with 3D Effect */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl"
        >
          <motion.img
            src={experience.image}
            alt={experience.title}
            className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {experience.title}
            </motion.h1>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Info Cards */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-blue-50 rounded-2xl p-4 text-center"
              >
                <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold">{experience.location}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-50 rounded-2xl p-4 text-center"
              >
                <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold">{experience.duration}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-purple-50 rounded-2xl p-4 text-center"
              >
                <Star className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Rating</p>
                <p className="font-semibold">{experience.rating} ({experience.reviewCount})</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-orange-50 rounded-2xl p-4 text-center"
              >
                <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Group Size</p>
                <p className="font-semibold">Up to 10</p>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 rounded-3xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">About this experience</h2>
              <p className="text-gray-700 leading-relaxed">{experience.fullDescription}</p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl p-8 border"
            >
              <h2 className="text-2xl font-bold mb-6">Experience Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experience.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white rounded-3xl shadow-2xl border p-6">
              {/* Price */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.8 }}
                  className="inline-block"
                >
                  <span className="text-4xl font-bold text-gray-900">${experience.price}</span>
                  {experience.originalPrice && (
                    <span className="text-lg text-gray-500 line-through ml-2">
                      ${experience.originalPrice}
                    </span>
                  )}
                  <div className="text-sm text-green-600 font-semibold mt-1">
                    Save ${experience.originalPrice ? experience.originalPrice - experience.price : 0}
                  </div>
                </motion.div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Select Date
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {experience.slots.map((slot, index) => (
                    <motion.button
                      key={slot.date}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDate(slot.date)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        selectedDate === slot.date
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {new Date(slot.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Available Slots</h3>
                <AnimatePresence>
                  <div className="space-y-2">
                    {availableSlots.map((slot, index) => (
                      <motion.button
                        key={`${slot.date}-${slot.startTime}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          selectedSlot?.startTime === slot.startTime
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${
                          slot.availableSlots === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer'
                        }`}
                        disabled={slot.availableSlots === 0}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold">
                              {slot.startTime} - {slot.endTime}
                            </div>
                            <div className="text-sm text-gray-600">
                              {slot.availableSlots} slots available
                            </div>
                          </div>
                          {selectedSlot?.startTime === slot.startTime && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </AnimatePresence>
              </div>

              {/* Book Button */}
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNow}
                disabled={!selectedSlot}
                className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
                  selectedSlot
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedSlot ? 'Book Now' : 'Select a Slot'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceDetails;