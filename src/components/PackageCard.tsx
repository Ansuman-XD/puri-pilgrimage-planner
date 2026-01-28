import { Package, formatPrice, calculatePackagePrice } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/context/BookingContext";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
}

export const PackageCard = ({ pkg }: PackageCardProps) => {
  const { booking, togglePackage, getNights } = useBooking();
  const isSelected = booking.selectedPackages.some((p) => p.id === pkg.id);
  const totalPrice = calculatePackagePrice(pkg, booking.guests, getNights());

  const getPriceLabel = () => {
    switch (pkg.priceType) {
      case "per_person":
        return `${formatPrice(pkg.price)} / person / night`;
      case "per_day":
        return `${formatPrice(pkg.price)} / night`;
      case "per_booking":
        return `${formatPrice(pkg.price)} / booking`;
      default:
        return formatPrice(pkg.price);
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-md",
        isSelected && "ring-2 ring-primary shadow-md bg-accent/50"
      )}
      onClick={() => togglePackage(pkg)}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-32 h-32 sm:h-auto flex-shrink-0">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 left-2 bg-card/90 text-foreground backdrop-blur-sm text-xs">
            {pkg.category}
          </Badge>
        </div>

        <CardContent className="flex-1 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{pkg.icon}</span>
                <h4 className="font-semibold text-foreground">{pkg.name}</h4>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {pkg.description}
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-sm text-muted-foreground">{getPriceLabel()}</p>
                {isSelected && (
                  <p className="text-sm font-semibold text-primary">
                    Total: {formatPrice(totalPrice)}
                  </p>
                )}
              </div>
            </div>

            <Checkbox
              checked={isSelected}
              className="h-6 w-6 mt-1"
              onClick={(e) => e.stopPropagation()}
              onCheckedChange={() => togglePackage(pkg)}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
