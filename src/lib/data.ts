// Hotel and booking data
import heroRoom from "@/assets/hero-room.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import jagannathTemple from "@/assets/jagannath-temple.jpg";
import puriBeach from "@/assets/puri-beach.jpg";
import foodThali from "@/assets/food-thali.jpg";

export interface Room {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  maxGuests: number;
  amenities: string[];
  image: string;
  size: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: "per_person" | "per_day" | "per_booking";
  icon: string;
  image: string;
  category: string;
}

export interface Review {
  id: string;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
  roomType: string;
  verified: boolean;
}

export const hotelInfo = {
  name: "Puri Beach Resort",
  tagline: "Where Temple Meets Ocean",
  description: "Experience divine serenity at our premium beachfront resort, just 5 minutes from Shree Jagannath Temple. Book your stay + darshan + food in 3 clicks.",
  address: "Sea Beach Road, Puri, Odisha 752001",
  phone: "+91 98765 43210",
  email: "reservations@puribeachresort.com",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  rating: 4.8,
  totalReviews: 1247,
};

export const rooms: Room[] = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    description: "Comfortable and elegant room with modern amenities and city view. Perfect for solo travelers or couples.",
    basePrice: 3500,
    maxGuests: 2,
    amenities: ["King Bed", "AC", "WiFi", "TV", "Mini Bar", "Room Service"],
    image: roomDeluxe,
    size: "320 sq ft",
  },
  {
    id: "sea-view",
    name: "Sea View Room",
    description: "Wake up to breathtaking views of Puri Beach. Spacious room with private balcony overlooking the Bay of Bengal.",
    basePrice: 5500,
    maxGuests: 3,
    amenities: ["King Bed", "AC", "WiFi", "TV", "Mini Bar", "Balcony", "Ocean View", "Room Service"],
    image: heroRoom,
    size: "450 sq ft",
  },
  {
    id: "premium-suite",
    name: "Premium Suite",
    description: "Luxurious suite with separate living area, panoramic ocean views, and premium amenities for an unforgettable stay.",
    basePrice: 9500,
    maxGuests: 4,
    amenities: ["King Bed", "AC", "WiFi", "TV", "Living Area", "Jacuzzi", "Balcony", "Ocean View", "Butler Service"],
    image: roomSuite,
    size: "750 sq ft",
  },
];

export const packages: Package[] = [
  {
    id: "beach-view-upgrade",
    name: "Beach View Upgrade",
    description: "Upgrade to a room with stunning beach views and private balcony",
    price: 1500,
    priceType: "per_booking",
    icon: "🏖️",
    image: puriBeach,
    category: "Room Upgrade",
  },
  {
    id: "breakfast",
    name: "Daily Breakfast",
    description: "Traditional Odia breakfast with fresh local delicacies",
    price: 450,
    priceType: "per_person",
    icon: "🍳",
    image: foodThali,
    category: "Meals",
  },
  {
    id: "full-board",
    name: "Full Board Meals",
    description: "Breakfast, Lunch & Dinner - Authentic Odia cuisine experience",
    price: 1200,
    priceType: "per_person",
    icon: "🍽️",
    image: foodThali,
    category: "Meals",
  },
  {
    id: "temple-darshan",
    name: "Temple Darshan Assistance",
    description: "Guided visit to Shree Jagannath Temple with priority entry assistance",
    price: 800,
    priceType: "per_person",
    icon: "🛕",
    image: jagannathTemple,
    category: "Experience",
  },
  {
    id: "airport-pickup",
    name: "Airport/Railway Pickup",
    description: "Comfortable AC vehicle pickup from Bhubaneswar Airport or Puri Railway Station",
    price: 1800,
    priceType: "per_booking",
    icon: "🚗",
    image: puriBeach,
    category: "Transport",
  },
  {
    id: "honeymoon-package",
    name: "Honeymoon Special",
    description: "Room decoration, cake, candlelight dinner, and couples spa session",
    price: 4500,
    priceType: "per_booking",
    icon: "💕",
    image: heroRoom,
    category: "Experience",
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    guestName: "Priya Sharma",
    rating: 5,
    comment: "Absolutely divine experience! The temple darshan assistance made our trip so convenient. The room was spotless and the sea view was breathtaking.",
    date: "2025-01-15",
    roomType: "Sea View Room",
    verified: true,
  },
  {
    id: "2",
    guestName: "Rahul Patel",
    rating: 5,
    comment: "Best hotel in Puri! The food was authentic Odia cuisine and the staff went above and beyond. Temple is just 5 mins away.",
    date: "2025-01-10",
    roomType: "Premium Suite",
    verified: true,
  },
  {
    id: "3",
    guestName: "Ananya Krishnan",
    rating: 4,
    comment: "Lovely stay with my family. Kids loved the beach access. The breakfast spread was excellent with so many options.",
    date: "2025-01-05",
    roomType: "Deluxe Room",
    verified: true,
  },
  {
    id: "4",
    guestName: "Suresh Mohanty",
    rating: 5,
    comment: "As a local Odia, I can vouch for the authenticity of this place. Perfect blend of comfort and tradition. Highly recommend the full board meals!",
    date: "2024-12-28",
    roomType: "Sea View Room",
    verified: true,
  },
  {
    id: "5",
    guestName: "Meera & Vikram",
    rating: 5,
    comment: "Our honeymoon was magical! The special package made everything perfect - from the decorated room to the candlelight dinner by the beach.",
    date: "2024-12-20",
    roomType: "Premium Suite",
    verified: true,
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export const calculatePackagePrice = (
  pkg: Package,
  guests: number,
  nights: number
): number => {
  switch (pkg.priceType) {
    case "per_person":
      return pkg.price * guests * nights;
    case "per_day":
      return pkg.price * nights;
    case "per_booking":
      return pkg.price;
    default:
      return pkg.price;
  }
};
