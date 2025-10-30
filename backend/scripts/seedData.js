// backend/scripts/seedData.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from '../models/Experience.js';
import PromoCode from '../models/PromoCode.js';

dotenv.config();

const experiences = [
  {
    title: 'Sunset Sailing Adventure',
    description: 'Enjoy a breathtaking sunset cruise with premium drinks and gourmet snacks.',
    fullDescription: 'Embark on an unforgettable sailing adventure as the sun dips below the horizon. Our premium sunset cruise offers the perfect blend of relaxation and excitement. Sip on carefully curated premium drinks while enjoying gourmet snacks prepared by our onboard chef. Capture stunning photos of the Miami skyline as it transforms with the setting sun. Our experienced crew will ensure your safety and comfort throughout this magical journey.',
    image: 'https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=800',
    price: 89,
    originalPrice: 120,
    duration: '3 hours',
    location: 'Miami Beach',
    category: 'Sailing',
    rating: 4.8,
    reviewCount: 142,
    included: [
      'Premium drinks',
      'Gourmet snacks',
      'Life jackets',
      'Professional guide',
      'Safety equipment'
    ],
    requirements: [
      'Swimming skills recommended',
      'Minimum age: 8',
      'Comfortable clothing',
      'Sun protection'
    ],
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
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        startTime: '17:00',
        endTime: '20:00',
        availableSlots: 8,
        maxSlots: 12
      },
      {
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        startTime: '17:00',
        endTime: '20:00',
        availableSlots: 12,
        maxSlots: 12
      },
      {
        date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        startTime: '17:00',
        endTime: '20:00',
        availableSlots: 6,
        maxSlots: 12
      }
    ]
  },
  {
    title: 'Mountain Hiking Expedition',
    description: 'Challenge yourself with this guided hiking adventure through scenic mountain trails.',
    fullDescription: 'Challenge yourself with this guided hiking expedition through some of the most scenic trails in the Rocky Mountains. Our expert guides will lead you through diverse terrain, from lush forests to breathtaking viewpoints. Learn about local flora and fauna while enjoying panoramic mountain vistas. This moderate-to-difficult hike is perfect for adventure seekers looking to push their limits in a safe, guided environment.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    price: 65,
    duration: '6 hours',
    location: 'Rocky Mountains',
    category: 'Hiking',
    rating: 4.9,
    reviewCount: 89,
    included: [
      'Professional guide',
      'Hiking equipment',
      'Lunch pack',
      'First aid',
      'Transportation to trailhead'
    ],
    requirements: [
      'Good physical condition',
      'Hiking shoes required',
      'Water bottle',
      'Weather-appropriate clothing'
    ],
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
        date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        startTime: '08:00',
        endTime: '14:00',
        availableSlots: 6,
        maxSlots: 10
      },
      {
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        startTime: '08:00',
        endTime: '14:00',
        availableSlots: 4,
        maxSlots: 10
      },
      {
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        startTime: '08:00',
        endTime: '14:00',
        availableSlots: 10,
        maxSlots: 10
      }
    ]
  }
];

const promoCode = [
  {
    code: 'SAVE10',
    discountType: 'percentage',
    discountValue: 10,
    minAmount: 50,
    maxDiscount: 20,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    usageLimit: 100,
    isActive: true
  },
  {
    code: 'FLAT100',
    discountType: 'fixed',
    discountValue: 100,
    minAmount: 200,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    usageLimit: 50,
    isActive: true
  },
  {
    code: 'WELCOME25',
    discountType: 'percentage',
    discountValue: 25,
    minAmount: 100,
    maxDiscount: 50,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    usageLimit: 200,
    isActive: true
  }
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/booklt');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Experience.deleteMany({});
    await PromoCode.deleteMany({});
    console.log('Cleared existing data');

    // Insert experiences
    const createdExperiences = await Experience.insertMany(experiences);
    console.log(`Inserted ${createdExperiences.length} experiences`);

    // Insert promo codes
    const createdPromoCodes = await PromoCode.insertMany(promoCode);
    console.log(`Inserted ${createdPromoCodes.length} promo codes`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();