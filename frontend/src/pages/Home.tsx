// frontend/src/pages/Home.tsx - UPDATED
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../types';
import ExperienceCard from '../components/ExperienceCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('https://bookit-91pz.onrender.com/api/experiences');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setExperiences(data);
        } else {
          // If backend returns { data: array } structure
          setExperiences(data.data || []);
        }
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to load experiences. Please try again later.');
        
        // Fallback to mock data if API is not available
        const { mockExperiences } = await import('../data/mockData');
        setExperiences(mockExperiences);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <p className="text-gray-600">Showing demo experiences</p>
        </div>
        <ExperienceGrid experiences={experiences} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Discover Amazing
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="block"
          >
            Experiences
          </motion.span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Book unforgettable travel adventures with local experts
        </p>
      </motion.div>

      <ExperienceGrid experiences={experiences} />
    </motion.div>
  );
};

// Separate component for the experiences grid
const ExperienceGrid: React.FC<{ experiences: Experience[] }> = ({ experiences }) => {
  if (experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No experiences available at the moment.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {experiences.map((experience, index) => (
        <ExperienceCard key={experience._id} experience={experience} index={index} />
      ))}
    </motion.div>
  );
};

export default Home;