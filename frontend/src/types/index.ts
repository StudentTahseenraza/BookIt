// frontend/src/types/index.ts
export interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  location: string;
  category: string;
  rating: number;
  reviewCount: number;
  included: string[];
  requirements: string[];
}

export interface Slot {
  date: string;
  availableSlots: number;
  startTime: string;
  endTime: string;
}

// Renamed to avoid conflict
export interface ExperienceDetail {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  location: string;
  category: string;
  rating: number;
  reviewCount: number;
  included: string[];
  requirements: string[];
  slots: Slot[];
  highlights: string[];
  fullDescription: string;
}

export interface BookingData {
  experienceId: string;
  slotDate: string;
  userName: string;
  userEmail: string;
  participants: number;
  promoCode?: string;
  totalPrice: number;
}

export interface PromoValidation {
  isValid: boolean;
  discountAmount: number;
  discountType: 'percentage' | 'fixed';
  finalPrice: number;
}