import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, X } from "lucide-react";
import { hotelInfo } from "@/lib/data";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Experiences", href: "/experiences" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🏨</span>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold text-foreground leading-tight">
                {hotelInfo.name}
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                {hotelInfo.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${hotelInfo.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">{hotelInfo.phone}</span>
            </a>
            <Button asChild>
              <Link to="/rooms">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <span className="font-serif text-lg font-bold">Menu</span>
                </div>
                <nav className="flex flex-col gap-4 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        location.pathname === item.href
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto space-y-4">
                  <a
                    href={`tel:${hotelInfo.phone}`}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Phone className="h-5 w-5" />
                    {hotelInfo.phone}
                  </a>
                  <Button asChild className="w-full" size="lg">
                    <Link to="/rooms" onClick={() => setIsOpen(false)}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
