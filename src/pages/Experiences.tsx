import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { packages, formatPrice } from "@/lib/data";
import { CheckCircle, Star } from "lucide-react";

const Experiences = () => {
  const categories = [...new Set(packages.map((pkg) => pkg.category))];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-accent/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              ✨ Curated Experiences
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Enhance Your Stay
            </h1>
            <p className="text-lg text-muted-foreground">
              Add unforgettable experiences to your booking. From temple darshan assistance 
              to authentic Odia cuisine, make every moment count.
            </p>
          </div>
        </div>
      </section>

      {/* Packages by Category */}
      {categories.map((category) => (
        <section key={category} className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
              {category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages
                .filter((pkg) => pkg.category === category)
                .map((pkg) => (
                  <Card
                    key={pkg.id}
                    className="overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge className="absolute top-3 left-3 bg-card/90 text-foreground backdrop-blur-sm">
                        {pkg.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-3xl">{pkg.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-serif text-xl font-bold text-foreground">
                            {pkg.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {pkg.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-2xl font-bold text-primary">
                            {formatPrice(pkg.price)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {pkg.priceType === "per_person" && "per person per night"}
                            {pkg.priceType === "per_day" && "per day"}
                            {pkg.priceType === "per_booking" && "one-time"}
                          </p>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/rooms">Add to Booking</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            Ready to Book Your Experience?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Select your room and add as many packages as you want. 
            Everything will be ready when you arrive.
          </p>
          <Button asChild size="lg">
            <Link to="/rooms">Browse Rooms & Packages</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experiences;
