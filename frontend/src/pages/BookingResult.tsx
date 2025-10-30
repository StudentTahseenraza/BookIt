// frontend/src/pages/BookingResult.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Check, X, Mail, Calendar, MapPin, Users } from 'lucide-react';

const BookingResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, bookingData } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8"
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Result Header */}
          <div className={`p-8 text-center ${success ? 'bg-green-500' : 'bg-red-500'}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              {success ? (
                <Check className="w-10 h-10 text-green-500" />
              ) : (
                <X className="w-10 h-10 text-red-500" />
              )}
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {success ? 'Booking Confirmed!' : 'Booking Failed'}
            </h1>
            <p className="text-white/90 text-lg">
              {success
                ? 'Your adventure has been successfully booked!'
                : 'Sorry, we encountered an issue with your booking.'}
            </p>
          </div>

          {/* Booking Details */}
          {success && bookingData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Booking Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{bookingData.userEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Participants</p>
                    <p className="font-semibold">{bookingData.participants} people</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold">
                      {new Date(bookingData.slotDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-semibold">${bookingData.totalPrice}</p>
                  </div>
                </div>
              </div>

              {/* Booking ID */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-gray-50 rounded-2xl p-6 text-center mb-6"
              >
                <p className="text-sm text-gray-600 mb-2">Booking Reference</p>
                <p className="text-xl font-mono font-bold text-gray-800">
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </motion.div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-semibold mb-3">What's Next?</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• You'll receive a confirmation email shortly</li>
                  <li>• Present your booking reference at check-in</li>
                  <li>• Arrive 15 minutes before your scheduled time</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-8 border-t"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-4 rounded-2xl font-semibold hover:shadow-lg transition-all"
              >
                Browse More Experiences
              </Link>
              {success && (
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-gray-100 text-gray-700 text-center py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Print Confirmation
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Celebration for Success */}
        {success && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  scale: 0,
                  opacity: 1,
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="fixed pointer-events-none text-2xl"
                style={{
                  left: '50%',
                  top: '50%',
                }}
              >
                {['🎉', '✨', '🌟', '🥳', '🎊'][i % 5]}
              </motion.div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default BookingResult;