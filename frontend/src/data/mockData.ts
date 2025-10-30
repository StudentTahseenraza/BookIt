// frontend/src/data/mockData.ts
import { Experience, ExperienceDetail, Slot } from '../types'; // Updated import

export const mockExperiences: Experience[] = [
  {
    _id: '1',
    title: 'Sunset Sailing Adventure',
    description: 'Enjoy a breathtaking sunset cruise with premium drinks and gourmet snacks.',
    image: 'https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=800',
    price: 89,
    originalPrice: 120,
    duration: '3 hours',
    location: 'Miami Beach',
    category: 'Sailing',
    rating: 4.8,
    reviewCount: 142,
    included: ['Premium drinks', 'Gourmet snacks', 'Life jackets', 'Professional guide'],
    requirements: ['Swimming skills recommended', 'Minimum age: 8']
  },
  {
    _id: '2',
    title: 'Mountain Hiking Expedition',
    description: 'Challenge yourself with this guided hiking adventure through scenic mountain trails.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    price: 65,
    duration: '6 hours',
    location: 'Rocky Mountains',
    category: 'Hiking',
    rating: 4.9,
    reviewCount: 89,
    included: ['Professional guide', 'Hiking equipment', 'Lunch pack', 'First aid'],
    requirements: ['Good physical condition', 'Hiking shoes required']
  },
  {
    _id: '3',
    title: 'Wine Tasting Tour',
    description: 'Explore local vineyards and taste award-winning wines with expert sommeliers.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800',
    price: 75,
    originalPrice: 90,
    duration: '4 hours',
    location: 'Napa Valley',
    category: 'Food & Drink',
    rating: 4.7,
    reviewCount: 203,
    included: ['Wine tasting', 'Vineyard tour', 'Cheese pairing', 'Transportation'],
    requirements: ['Minimum age: 21', 'Valid ID required']
  },
  {
    _id: '4',
    title: 'Scuba Diving Discovery',
    description: 'Discover underwater wonders with certified diving instructors in crystal clear waters.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    price: 120,
    duration: '5 hours',
    location: 'Great Barrier Reef',
    category: 'Diving',
    rating: 4.9,
    reviewCount: 167,
    included: ['Diving equipment', 'Certified instructor', 'Underwater photos', 'Refreshments'],
    requirements: ['Swimming skills required', 'Medical certificate']
  }
];

// Updated interface name
export const mockExperienceDetails: { [key: string]: ExperienceDetail } = {
  '1': {
    ...mockExperiences[0],
    fullDescription: 'Embark on an unforgettable sailing adventure as the sun dips below the horizon. Our premium sunset cruise offers the perfect blend of relaxation and excitement. Sip on carefully curated premium drinks while enjoying gourmet snacks prepared by our onboard chef. Capture stunning photos of the Miami skyline as it transforms with the setting sun. Our experienced crew will ensure your safety and comfort throughout this magical journey.',
    highlights: [
      'Stunning sunset views over Miami Beach',
      'Premium open bar with signature cocktails',
      'Gourmet snacks and light bites',
      'Professional photography opportunities',
      'Small group experience (max 12 guests)',
      'Comfortable seating and shaded areas'
    ],
    slots: [
      {
        date: '2024-02-15',
        availableSlots: 8,
        startTime: '17:00',
        endTime: '20:00'
      },
      {
        date: '2024-02-16',
        availableSlots: 5,
        startTime: '17:00',
        endTime: '20:00'
      },
      {
        date: '2024-02-17',
        availableSlots: 12,
        startTime: '17:00',
        endTime: '20:00'
      }
    ]
  },
  '2': {
    ...mockExperiences[1],
    fullDescription: 'Challenge yourself with this guided hiking expedition through some of the most scenic trails in the Rocky Mountains. Our expert guides will lead you through diverse terrain, from lush forests to breathtaking viewpoints. Learn about local flora and fauna while enjoying panoramic mountain vistas. This moderate-to-difficult hike is perfect for adventure seekers looking to push their limits in a safe, guided environment.',
    highlights: [
      'Panoramic mountain views from summit',
      'Expert local guide with wilderness first aid',
      'Small group size for personalized attention',
      'Wildlife spotting opportunities',
      'Professional hiking equipment provided',
      'Delicious lunch with local ingredients'
    ],
    slots: [
      {
        date: '2024-02-15',
        availableSlots: 6,
        startTime: '08:00',
        endTime: '14:00'
      },
      {
        date: '2024-02-16',
        availableSlots: 4,
        startTime: '08:00',
        endTime: '14:00'
      }
    ]
  }
};