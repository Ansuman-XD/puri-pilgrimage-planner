import React, { createContext, useContext, useState, ReactNode } from "react";
import { Room, Package } from "@/lib/data";
import { addDays } from "date-fns";

export interface BookingState {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  selectedRoom: Room | null;
  selectedPackages: Package[];
  guestDetails: {
    name: string;
    email: string;
    phone: string;
  };
}

interface BookingContextType {
  booking: BookingState;
  setCheckIn: (date: Date) => void;
  setCheckOut: (date: Date) => void;
  setGuests: (count: number) => void;
  setSelectedRoom: (room: Room | null) => void;
  togglePackage: (pkg: Package) => void;
  setGuestDetails: (details: BookingState["guestDetails"]) => void;
  getNights: () => number;
  getTotalPrice: () => number;
  getRoomTotal: () => number;
  getPackagesTotal: () => number;
  getTaxes: () => number;
  resetBooking: () => void;
}

const initialState: BookingState = {
  checkIn: new Date(),
  checkOut: addDays(new Date(), 1),
  guests: 2,
  selectedRoom: null,
  selectedPackages: [],
  guestDetails: {
    name: "",
    email: "",
    phone: "",
  },
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [booking, setBooking] = useState<BookingState>(initialState);

  const setCheckIn = (date: Date) => {
    setBooking((prev) => ({
      ...prev,
      checkIn: date,
      checkOut: date >= prev.checkOut ? addDays(date, 1) : prev.checkOut,
    }));
  };

  const setCheckOut = (date: Date) => {
    setBooking((prev) => ({ ...prev, checkOut: date }));
  };

  const setGuests = (count: number) => {
    setBooking((prev) => ({ ...prev, guests: count }));
  };

  const setSelectedRoom = (room: Room | null) => {
    setBooking((prev) => ({ ...prev, selectedRoom: room }));
  };

  const togglePackage = (pkg: Package) => {
    setBooking((prev) => {
      const exists = prev.selectedPackages.find((p) => p.id === pkg.id);
      if (exists) {
        return {
          ...prev,
          selectedPackages: prev.selectedPackages.filter((p) => p.id !== pkg.id),
        };
      }
      return {
        ...prev,
        selectedPackages: [...prev.selectedPackages, pkg],
      };
    });
  };

  const setGuestDetails = (details: BookingState["guestDetails"]) => {
    setBooking((prev) => ({ ...prev, guestDetails: details }));
  };

  const getNights = () => {
    const diffTime = booking.checkOut.getTime() - booking.checkIn.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getRoomTotal = () => {
    if (!booking.selectedRoom) return 0;
    return booking.selectedRoom.basePrice * getNights();
  };

  const getPackagesTotal = () => {
    const nights = getNights();
    return booking.selectedPackages.reduce((total, pkg) => {
      switch (pkg.priceType) {
        case "per_person":
          return total + pkg.price * booking.guests * nights;
        case "per_day":
          return total + pkg.price * nights;
        case "per_booking":
          return total + pkg.price;
        default:
          return total + pkg.price;
      }
    }, 0);
  };

  const getTaxes = () => {
    const subtotal = getRoomTotal() + getPackagesTotal();
    return Math.round(subtotal * 0.18); // 18% GST
  };

  const getTotalPrice = () => {
    return getRoomTotal() + getPackagesTotal() + getTaxes();
  };

  const resetBooking = () => {
    setBooking(initialState);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setCheckIn,
        setCheckOut,
        setGuests,
        setSelectedRoom,
        togglePackage,
        setGuestDetails,
        getNights,
        getTotalPrice,
        getRoomTotal,
        getPackagesTotal,
        getTaxes,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
