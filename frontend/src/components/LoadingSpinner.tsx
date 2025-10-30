// frontend/src/components/LoadingSpinner.tsx
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer Spinning Ring */}
        <motion.div
          className="w-16 h-16 border-4 border-blue-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Spinning Dot */}
        <motion.div
          className="absolute top-0 left-0 w-16 h-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-4 h-4 bg-blue-500 rounded-full" />
        </motion.div>
        
        {/* Text */}
        <motion.p
          className="mt-4 text-gray-600 text-center"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
        >
          Loading Experiences...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;