import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingWidget } from "@/components/BookingWidget";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { hotelInfo, rooms, packages, reviews, formatPrice } from "@/lib/data";
import { Star, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import heroRoom from "@/assets/hero-room.jpg";
import jagannathTemple from "@/assets/jagannath-temple.jpg";
import puriBeach from "@/assets/puri-beach.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroRoom})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-card">
              <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                🛕 5 min from Jagannath Temple
              </Badge>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {hotelInfo.tagline}
              </h1>

              <p className="text-lg md:text-xl text-card/80 max-w-lg">
                {hotelInfo.description}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(hotelInfo.rating)
                          ? "text-primary fill-primary"
                          : "text-card/40"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-card font-medium">
                  {hotelInfo.rating} ({hotelInfo.totalReviews.toLocaleString()} reviews)
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="border-card/30 text-card backdrop-blur-sm">
                  🏖️ Beachfront
                </Badge>
                <Badge variant="outline" className="border-card/30 text-card backdrop-blur-sm">
                  🍽️ In-house Restaurant
                </Badge>
                <Badge variant="outline" className="border-card/30 text-card backdrop-blur-sm">
                  🛕 Temple Assistance
                </Badge>
              </div>
            </div>

            <div className="lg:ml-auto w-full max-w-md">
              <BookingWidget variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of spirituality and comfort at Puri's premier beachfront resort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛕",
                title: "Temple Proximity",
                description: "Just 5 minutes walk to Shree Jagannath Temple. Get darshan assistance included with your stay.",
              },
              {
                icon: "🏖️",
                title: "Beach Access",
                description: "Direct access to the pristine Puri Beach. Wake up to the sound of waves.",
              },
              {
                icon: "🍽️",
                title: "Authentic Cuisine",
                description: "Savor traditional Odia delicacies prepared by local chefs. Mahaprasad available.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardContent className="p-8">
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Our Rooms
              </h2>
              <p className="text-muted-foreground">
                Choose from our carefully designed rooms for your perfect stay
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/rooms">View All Rooms</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Card key={room.id} className="overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-3 left-3 bg-card/90 text-foreground backdrop-blur-sm">
                    {room.size}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                    {room.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {room.description}
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {formatPrice(room.basePrice)}
                      </p>
                      <p className="text-xs text-muted-foreground">per night</p>
                    </div>
                    <Button asChild size="sm">
                      <Link to="/rooms">Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Enhance Your Stay
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Add curated experience packages to make your trip memorable
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.slice(0, 6).map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-3 left-3 bg-card/90 text-foreground backdrop-blur-sm text-xs">
                    {pkg.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{pkg.icon}</span>
                    <h4 className="font-semibold text-foreground">{pkg.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {pkg.description}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {formatPrice(pkg.price)}
                    <span className="text-xs font-normal text-muted-foreground ml-1">
                      / {pkg.priceType.replace("per_", "").replace("_", " ")}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/rooms">Book Now & Add Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Puri
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the divine beauty of Puri - from sacred temples to serene beaches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={jagannathTemple}
                  alt="Jagannath Temple"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-card">
                  <h3 className="font-serif text-2xl font-bold mb-2">
                    Shree Jagannath Temple
                  </h3>
                  <p className="text-card/80 text-sm">
                    One of the sacred Char Dham pilgrimage sites. We arrange darshan assistance for all guests.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={puriBeach}
                  alt="Puri Beach"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-card">
                  <h3 className="font-serif text-2xl font-bold mb-2">
                    Puri Beach
                  </h3>
                  <p className="text-card/80 text-sm">
                    Golden sands and gentle waves. Our resort offers direct beach access for sunrise views.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  Guest Reviews
                </h2>
                <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                  <Star className="h-5 w-5 text-primary fill-primary" />
                  <span className="font-bold text-primary">{hotelInfo.rating}</span>
                </div>
              </div>
              <p className="text-muted-foreground">
                Based on {hotelInfo.totalReviews.toLocaleString()} verified guest reviews
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Get In Touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Have questions? Our team is here to help you plan the perfect Puri experience.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Location</h4>
                    <p className="text-muted-foreground">{hotelInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                    <a
                      href={`tel:${hotelInfo.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {hotelInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <a
                      href={`mailto:${hotelInfo.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {hotelInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                Quick Booking Inquiry
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  For instant bookings, use our online reservation system. For group bookings or special requests, contact us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="flex-1">
                    <Link to="/rooms">Book Online</Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <a href={`tel:${hotelInfo.phone}`}>Call Now</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
