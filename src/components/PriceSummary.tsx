import { formatPrice } from "@/lib/data";
import { useBooking } from "@/context/BookingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

export const PriceSummary = () => {
  const {
    booking,
    getNights,
    getRoomTotal,
    getPackagesTotal,
    getTaxes,
    getTotalPrice,
  } = useBooking();

  const nights = getNights();

  if (!booking.selectedRoom) {
    return null;
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="font-serif text-lg">Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Check-in</p>
            <p className="font-medium">{format(booking.checkIn, "dd MMM yyyy")}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Check-out</p>
            <p className="font-medium">{format(booking.checkOut, "dd MMM yyyy")}</p>
          </div>
        </div>

        <div className="text-sm">
          <p className="text-muted-foreground">Guests</p>
          <p className="font-medium">
            {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"} · {nights}{" "}
            {nights === 1 ? "Night" : "Nights"}
          </p>
        </div>

        <Separator />

        {/* Room */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground">{booking.selectedRoom.name}</span>
            <span className="font-medium">{formatPrice(getRoomTotal())}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatPrice(booking.selectedRoom.basePrice)} × {nights}{" "}
            {nights === 1 ? "night" : "nights"}
          </p>
        </div>

        {/* Packages */}
        {booking.selectedPackages.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Add-ons</p>
              {booking.selectedPackages.map((pkg) => (
                <div key={pkg.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <span>{pkg.icon}</span> {pkg.name}
                  </span>
                  <span>
                    {formatPrice(
                      pkg.priceType === "per_person"
                        ? pkg.price * booking.guests * nights
                        : pkg.priceType === "per_day"
                        ? pkg.price * nights
                        : pkg.price
                    )}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <Separator />

        {/* Taxes */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Taxes & fees (18% GST)</span>
          <span>{formatPrice(getTaxes())}</span>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(getTotalPrice())}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
