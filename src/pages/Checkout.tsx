import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PriceSummary } from "@/components/PriceSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useBooking } from "@/context/BookingContext";
import { hotelInfo } from "@/lib/data";
import {
  CreditCard,
  Smartphone,
  Building,
  Shield,
  Loader2,
  AlertCircle,
} from "lucide-react";

type PaymentMethod = "upi" | "card" | "netbanking";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { booking, setGuestDetails } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!booking.guestDetails.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!booking.guestDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.guestDetails.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!booking.guestDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(booking.guestDetails.phone)) {
      newErrors.phone = "Invalid Indian phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate booking ID
    const bookingId = `PBR${Date.now().toString(36).toUpperCase()}`;

    setIsProcessing(false);
    navigate(`/confirmation/${bookingId}`);
  };

  const handleInputChange = (field: keyof typeof booking.guestDetails, value: string) => {
    setGuestDetails({
      ...booking.guestDetails,
      [field]: value,
    });
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (!booking.selectedRoom) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
              No Room Selected
            </h1>
            <p className="text-muted-foreground mb-6">
              Please select a room to continue with booking.
            </p>
            <Button onClick={() => navigate("/rooms")}>Select a Room</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Complete Your Booking
            </h1>
            <p className="text-muted-foreground">
              Secure payment · Instant confirmation · Free cancellation*
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Guest Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">
                      Guest Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={booking.guestDetails.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={booking.guestDetails.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                            +91
                          </span>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="9876543210"
                            value={booking.guestDetails.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className={`rounded-l-none ${errors.phone ? "border-destructive" : ""}`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(val) => setPaymentMethod(val as PaymentMethod)}
                      className="space-y-3"
                    >
                      <div
                        className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === "upi"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        }`}
                        onClick={() => setPaymentMethod("upi")}
                      >
                        <RadioGroupItem value="upi" id="upi" />
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <Label htmlFor="upi" className="cursor-pointer font-medium">
                            UPI
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Google Pay, PhonePe, Paytm, BHIM
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === "card"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <Label htmlFor="card" className="cursor-pointer font-medium">
                            Credit / Debit Card
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Visa, Mastercard, RuPay
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === "netbanking"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        }`}
                        onClick={() => setPaymentMethod("netbanking")}
                      >
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Building className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <Label htmlFor="netbanking" className="cursor-pointer font-medium">
                            Net Banking
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            All major banks supported
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Policies */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">
                      Important Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-foreground">Free Cancellation:</strong>{" "}
                        Cancel up to 24 hours before check-in for a full refund.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <p>
                        <strong className="text-foreground">Check-in:</strong>{" "}
                        {hotelInfo.checkInTime} |{" "}
                        <strong className="text-foreground">Check-out:</strong>{" "}
                        {hotelInfo.checkOutTime}
                      </p>
                      <p className="mt-2">
                        Early check-in and late check-out available on request and subject to availability.
                      </p>
                    </div>
                    <Separator />
                    <p>
                      By completing this booking, you agree to our Terms & Conditions and Privacy Policy.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-4">
                <PriceSummary />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    "Confirm & Pay"
                  )}
                </Button>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment powered by trusted gateways</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
