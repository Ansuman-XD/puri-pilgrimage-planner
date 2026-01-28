import { Link } from "react-router-dom";
import { hotelInfo } from "@/lib/data";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏨</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {hotelInfo.name}
                </h3>
                <p className="text-xs text-muted-foreground">{hotelInfo.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your premier destination for spiritual and leisure travel in Puri.
              Experience the divine at Jagannath Temple and relax at Puri Beach.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Us</h4>
            <div className="space-y-3">
              <a
                href={`tel:${hotelInfo.phone}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {hotelInfo.phone}
              </a>
              <a
                href={`mailto:${hotelInfo.email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                {hotelInfo.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {hotelInfo.address}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              {["Rooms", "Experiences", "Reviews", "About Us", "Privacy Policy"].map(
                (link) => (
                  <Link
                    key={link}
                    to={link === "Rooms" ? "/rooms" : `/#${link.toLowerCase().replace(" ", "-")}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Timings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Hotel Timings</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <div>
                  <p>Check-in: {hotelInfo.checkInTime}</p>
                  <p>Check-out: {hotelInfo.checkOutTime}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Early check-in and late check-out available on request.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {hotelInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🛕 5 min from Jagannath Temple</span>
            <span>🏖️ Beachfront Location</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
