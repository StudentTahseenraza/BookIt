// frontend/src/components/ExperienceCard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Experience } from '../types';
import { Star, MapPin, Clock } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      {/* 3D Card Effect */}
      <motion.div
        animate={{
          rotateY: isHovered ? 10 : 0,
          rotateX: isHovered ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden h-48">
          <motion.img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Price Tag */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg"
          >
            <span className="font-bold text-green-600">${experience.price}</span>
            {experience.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-1">
                ${experience.originalPrice}
              </span>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2">
            {experience.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {experience.description}
          </p>

          {/* Rating and Location */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{experience.rating}</span>
              <span className="text-sm text-gray-500">({experience.reviewCount})</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {experience.location}
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Clock className="w-4 h-4 mr-1" />
            {experience.duration}
          </div>

          {/* Book Now Button */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              to={`/experience/${experience._id}`}
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
            >
              View Details
            </Link>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered 
              ? "0 0 40px rgba(59, 130, 246, 0.3)" 
              : "0 0 0px rgba(59, 130, 246, 0)"
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;