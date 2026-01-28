import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "@/context/BookingContext";

// Public Pages
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Experiences from "./pages/Experiences";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import WriteReview from "./pages/WriteReview";
import NotFound from "./pages/NotFound";

// Admin Pages
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminHotel from "./pages/admin/Hotel";
import AdminPackages from "./pages/admin/Packages";
import AdminBookings from "./pages/admin/Bookings";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BookingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation/:id" element={<Confirmation />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/review/:bookingId" element={<WriteReview />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="hotel" element={<AdminHotel />} />
              <Route path="packages" element={<AdminPackages />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
