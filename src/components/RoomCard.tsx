import { Room, formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Users } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  onSelect: (room: Room) => void;
}

export const RoomCard = ({ room, onSelect }: RoomCardProps) => {
  const { booking, getNights } = useBooking();
  const isSelected = booking.selectedRoom?.id === room.id;
  const nights = getNights();
  const totalPrice = room.basePrice * nights;

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg",
        isSelected && "ring-2 ring-primary shadow-lg"
      )}
      onClick={() => onSelect(room)}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {isSelected && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground p-1.5 rounded-full">
            <Check className="h-4 w-4" />
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-card/90 text-foreground backdrop-blur-sm">
          {room.size}
        </Badge>
      </div>

      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground">
            {room.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {room.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 4).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{room.amenities.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Up to {room.maxGuests} guests</span>
        </div>

        <div className="flex items-end justify-between pt-2 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-foreground">
              {formatPrice(room.basePrice)}
            </p>
            <p className="text-xs text-muted-foreground">per night</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-primary">
              {formatPrice(totalPrice)}
            </p>
            <p className="text-xs text-muted-foreground">
              {nights} {nights === 1 ? "night" : "nights"}
            </p>
          </div>
        </div>

        <Button
          className="w-full"
          variant={isSelected ? "secondary" : "default"}
        >
          {isSelected ? "Selected" : "Select Room"}
        </Button>
      </CardContent>
    </Card>
  );
};
