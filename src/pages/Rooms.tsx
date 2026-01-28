import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { PackageCard } from "@/components/PackageCard";
import { PriceSummary } from "@/components/PriceSummary";
import { BookingWidget } from "@/components/BookingWidget";
import { Button } from "@/components/ui/button";
import { rooms, packages, Room } from "@/lib/data";
import { useBooking } from "@/context/BookingContext";
import { ArrowRight } from "lucide-react";

const RoomsPage = () => {
  const navigate = useNavigate();
  const { booking, setSelectedRoom } = useBooking();

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleProceed = () => {
    if (booking.selectedRoom) {
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Select Your Room
            </h1>
            <p className="text-muted-foreground">
              Choose a room, add experiences, and complete your booking
            </p>
          </div>

          {/* Booking Widget */}
          <div className="mb-10">
            <BookingWidget variant="compact" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Room Selection */}
              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Available Rooms
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      onSelect={handleRoomSelect}
                    />
                  ))}
                </div>
              </section>

              {/* Package Selection */}
              {booking.selectedRoom && (
                <section>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Enhance Your Stay
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Add optional packages to make your trip memorable
                  </p>
                  <div className="space-y-4">
                    {packages.map((pkg) => (
                      <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {booking.selectedRoom ? (
                <div className="space-y-4">
                  <PriceSummary />
                  <Button
                    onClick={handleProceed}
                    size="lg"
                    className="w-full"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="bg-accent/50 rounded-xl p-6 text-center sticky top-24">
                  <p className="text-muted-foreground">
                    Select a room to see pricing details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoomsPage;
