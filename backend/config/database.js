// backend/config/database.js - UPDATED SEEDING
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/booklt'
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Seed initial data if database is empty
    await seedInitialData();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('💡 Please make sure MongoDB is running:');
    console.log('   - Install MongoDB: https://www.mongodb.com/try/download/community');
    console.log('   - Or use MongoDB Atlas: https://www.mongodb.com/atlas');
    console.log('   - Then run: mongod --dbpath="C:\\data\\db" (Windows)');
    process.exit(1);
  }
};

const seedInitialData = async () => {
  try {
    const Experience = mongoose.model('Experience');
    const PromoCode = mongoose.model('PromoCode');
    
    const experienceCount = await Experience.countDocuments();
    const promoCount = await PromoCode.countDocuments();
    
    if (experienceCount === 0) {
      console.log('📦 Seeding initial experiences data...');
      
      const experiencesData = [
        {
          title: 'Sunset Sailing Adventure',
          description: 'Enjoy a breathtaking sunset cruise with premium drinks and gourmet snacks.',
          fullDescription: 'Embark on an unforgettable sailing adventure as the sun dips below the horizon. Our premium sunset cruise offers the perfect blend of relaxation and excitement. Sip on carefully curated premium drinks while enjoying gourmet snacks prepared by our onboard chef.',
          image: 'https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=800',
          price: 89,
          originalPrice: 120,
          duration: '3 hours',
          location: 'Miami Beach',
          category: 'Sailing',
          rating: 4.8,
          reviewCount: 142,
          included: ['Premium drinks', 'Gourmet snacks', 'Life jackets', 'Professional guide'],
          requirements: ['Swimming skills recommended', 'Minimum age: 8'],
          highlights: [
            'Stunning sunset views over Miami Beach',
            'Premium open bar with signature cocktails',
            'Gourmet snacks and light bites',
            'Professional photography opportunities'
          ],
          slots: [
            {
              date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
              startTime: '17:00',
              endTime: '20:00',
              maxSlots: 12,
              availableSlots: 12
            },
            {
              date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              startTime: '17:00',
              endTime: '20:00',
              maxSlots: 12,
              availableSlots: 12
            }
          ],
          isActive: true
        },
        {
          title: 'Mountain Hiking Expedition',
          description: 'Challenge yourself with this guided hiking adventure through scenic mountain trails.',
          fullDescription: 'Challenge yourself with this guided hiking expedition through some of the most scenic trails in the Rocky Mountains. Our expert guides will lead you through diverse terrain, from lush forests to breathtaking viewpoints.',
          image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
          price: 65,
          duration: '6 hours',
          location: 'Rocky Mountains',
          category: 'Hiking',
          rating: 4.9,
          reviewCount: 89,
          included: ['Professional guide', 'Hiking equipment', 'Lunch pack', 'First aid'],
          requirements: ['Good physical condition', 'Hiking shoes required'],
          highlights: [
            'Panoramic mountain views from summit',
            'Expert local guide with wilderness first aid',
            'Small group size for personalized attention',
            'Wildlife spotting opportunities'
          ],
          slots: [
            {
              date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
              startTime: '08:00',
              endTime: '14:00',
              maxSlots: 10,
              availableSlots: 10
            },
            {
              date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
              startTime: '08:00',
              endTime: '14:00',
              maxSlots: 10,
              availableSlots: 10
            }
          ],
          isActive: true
        },
        {
          title: 'Wine Tasting Tour',
          description: 'Explore local vineyards and taste award-winning wines with expert sommeliers.',
          fullDescription: 'Indulge in a sophisticated wine tasting experience at some of the region\'s most prestigious vineyards. Our expert sommeliers will guide you through a curated selection of award-winning wines.',
          image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800',
          price: 75,
          originalPrice: 90,
          duration: '4 hours',
          location: 'Napa Valley',
          category: 'Food & Drink',
          rating: 4.7,
          reviewCount: 203,
          included: ['Wine tasting', 'Vineyard tour', 'Cheese pairing', 'Transportation'],
          requirements: ['Minimum age: 21', 'Valid ID required'],
          highlights: [
            'Award-winning wine selection',
            'Expert sommelier guidance',
            'Beautiful vineyard scenery',
            'Gourmet food pairings'
          ],
          slots: [
            {
              date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
              startTime: '11:00',
              endTime: '15:00',
              maxSlots: 15,
              availableSlots: 15
            },
            {
              date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
              startTime: '11:00',
              endTime: '15:00',
              maxSlots: 15,
              availableSlots: 15
            }
          ],
          isActive: true
        },
        {
          title: 'Scuba Diving Discovery',
          description: 'Discover underwater wonders with certified diving instructors in crystal clear waters.',
          fullDescription: 'Explore the mesmerizing underwater world with our certified diving instructors. Suitable for both beginners and experienced divers, this adventure takes you to vibrant coral reefs teeming with marine life.',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
          price: 120,
          duration: '5 hours',
          location: 'Great Barrier Reef',
          category: 'Diving',
          rating: 4.9,
          reviewCount: 167,
          included: ['Diving equipment', 'Certified instructor', 'Underwater photos', 'Refreshments'],
          requirements: ['Swimming skills required', 'Medical certificate'],
          highlights: [
            'Vibrant coral reef exploration',
            'Professional underwater photography',
            'Small group sizes for safety',
            'Marine life encounters'
          ],
          slots: [
            {
              date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              startTime: '09:00',
              endTime: '14:00',
              maxSlots: 8,
              availableSlots: 8
            },
            {
              date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
              startTime: '09:00',
              endTime: '14:00',
              maxSlots: 8,
              availableSlots: 8
            }
          ],
          isActive: true
        }
      ];

      await Experience.insertMany(experiencesData);
      console.log('✅ Experiences seeded successfully');
    }
    
    if (promoCount === 0) {
      console.log('📦 Seeding initial promo codes...');
      await PromoCode.insertMany([
        {
          code: 'SAVE10',
          discountType: 'percentage',
          discountValue: 10,
          minAmount: 50,
          maxDiscount: 20,
          validFrom: new Date(),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          usageLimit: 100,
          isActive: true
        },
        {
          code: 'FLAT100',
          discountType: 'fixed',
          discountValue: 100,
          minAmount: 200,
          validFrom: new Date(),
          validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
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
          validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          usageLimit: 200,
          isActive: true
        }
      ]);
      console.log('✅ Promo codes seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding data:', error.message);
  }
};

export default connectDB;