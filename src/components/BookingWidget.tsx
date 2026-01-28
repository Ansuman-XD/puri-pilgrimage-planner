import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useBooking } from "@/context/BookingContext";

interface BookingWidgetProps {
  variant?: "hero" | "compact";
}

export const BookingWidget = ({ variant = "hero" }: BookingWidgetProps) => {
  const navigate = useNavigate();
  const { booking, setCheckIn, setCheckOut, setGuests } = useBooking();

  const handleSearch = () => {
    navigate("/rooms");
  };

  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "rounded-xl border border-border shadow-lg",
        isHero ? "bg-card p-6 md:p-8" : "bg-card p-4"
      )}
    >
      {isHero && (
        <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6">
          Book Your Stay
        </h3>
      )}

      <div
        className={cn(
          "grid gap-4",
          isHero
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-4"
        )}
      >
        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Check-in
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !booking.checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {booking.checkIn
                  ? format(booking.checkIn, "dd MMM yyyy")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={booking.checkIn}
                onSelect={(date) => date && setCheckIn(date)}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Check-out
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !booking.checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {booking.checkOut
                  ? format(booking.checkOut, "dd MMM yyyy")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={booking.checkOut}
                onSelect={(date) => date && setCheckOut(date)}
                disabled={(date) => date <= booking.checkIn}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Guests
          </label>
          <Select
            value={booking.guests.toString()}
            onValueChange={(val) => setGuests(parseInt(val))}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className={cn("space-y-2", isHero && "flex items-end")}>
          {isHero && <div className="hidden md:block" />}
          <Button
            onClick={handleSearch}
            size={isHero ? "lg" : "default"}
            className="w-full"
          >
            Check Availability
          </Button>
        </div>
      </div>
    </div>
  );
};
