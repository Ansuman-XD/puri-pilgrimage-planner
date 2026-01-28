import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useBooking } from "@/context/BookingContext";
import { hotelInfo, formatPrice } from "@/lib/data";
import { format } from "date-fns";
import {
  CheckCircle,
  Calendar,
  Users,
  MapPin,
  Phone,
  Clock,
  Share2,
  Download,
  MessageCircle,
} from "lucide-react";

const ConfirmationPage = () => {
  const { id } = useParams<{ id: string }>();
  const { booking, getNights, getTotalPrice, getRoomTotal, getPackagesTotal, getTaxes } = useBooking();

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `🏨 Booking Confirmed!\n\n` +
        `Booking ID: ${id}\n` +
        `Hotel: ${hotelInfo.name}\n` +
        `Check-in: ${format(booking.checkIn, "dd MMM yyyy")}\n` +
        `Check-out: ${format(booking.checkOut, "dd MMM yyyy")}\n` +
        `Room: ${booking.selectedRoom?.name}\n` +
        `Total: ${formatPrice(getTotalPrice())}\n\n` +
        `📍 ${hotelInfo.address}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleDownload = () => {
    // In production, this would generate a PDF
    alert("Download feature will generate a PDF confirmation in production.");
  };

  if (!booking.selectedRoom) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
              Booking Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find your booking details. Please try booking again.
            </p>
            <Button asChild>
              <Link to="/rooms">Book a Room</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const nights = getNights();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Animation */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-bounce">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Thank you for choosing {hotelInfo.name}
            </p>
          </div>

          {/* Booking ID */}
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
              <p className="text-2xl font-mono font-bold text-primary">{id}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Confirmation sent to {booking.guestDetails.email}
              </p>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="mb-8">
            <CardContent className="p-6 space-y-6">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Booking Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Room Info */}
                <div className="flex gap-4">
                  <img
                    src={booking.selectedRoom.image}
                    alt={booking.selectedRoom.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {booking.selectedRoom.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {booking.selectedRoom.size}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      <Users className="h-3 w-3 mr-1" />
                      {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
                    </Badge>
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Check-in</p>
                      <p className="font-medium">
                        {format(booking.checkIn, "EEEE, dd MMM yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Check-out</p>
                      <p className="font-medium">
                        {format(booking.checkOut, "EEEE, dd MMM yyyy")}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {nights} {nights === 1 ? "night" : "nights"}
                  </p>
                </div>
              </div>

              {/* Packages */}
              {booking.selectedPackages.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">
                      Add-on Packages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {booking.selectedPackages.map((pkg) => (
                        <Badge key={pkg.id} variant="outline" className="text-sm">
                          {pkg.icon} {pkg.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Price Breakdown */}
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room ({nights} nights)</span>
                  <span>{formatPrice(getRoomTotal())}</span>
                </div>
                {getPackagesTotal() > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Packages</span>
                    <span>{formatPrice(getPackagesTotal())}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & fees</span>
                  <span>{formatPrice(getTaxes())}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Paid</span>
                  <span className="text-primary">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share Actions */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button variant="outline" onClick={handleWhatsAppShare}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Share via WhatsApp
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Confirmation
            </Button>
          </div>

          {/* Important Information */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Important Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Check-in/Check-out</p>
                      <p className="text-sm text-muted-foreground">
                        Check-in: {hotelInfo.checkInTime} | Check-out: {hotelInfo.checkOutTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Hotel Address</p>
                      <p className="text-sm text-muted-foreground">
                        {hotelInfo.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Contact</p>
                      <a
                        href={`tel:${hotelInfo.phone}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {hotelInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="bg-accent/50 rounded-lg p-4">
                    <p className="font-medium text-foreground mb-1">🛕 Temple Tip</p>
                    <p className="text-sm text-muted-foreground">
                      Jagannath Temple opens at 5:00 AM. Best darshan time is early morning.
                      Contact us for darshan assistance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConfirmationPage;
