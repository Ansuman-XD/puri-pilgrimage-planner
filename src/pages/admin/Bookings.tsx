import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Search, Filter, Eye, CheckCircle, XCircle } from "lucide-react";
import { formatPrice } from "@/lib/data";

const mockBookings = [
  {
    id: "BK-20250128-001",
    guestName: "Priya Sharma",
    email: "priya@email.com",
    phone: "+91 98765 43210",
    room: "Sea View Room",
    checkIn: "2025-01-28",
    checkOut: "2025-01-30",
    guests: 2,
    packages: ["Temple Darshan", "Breakfast"],
    total: 14500,
    status: "confirmed",
    createdAt: "2025-01-25",
  },
  {
    id: "BK-20250128-002",
    guestName: "Rahul Patel",
    email: "rahul@email.com",
    phone: "+91 87654 32109",
    room: "Premium Suite",
    checkIn: "2025-01-29",
    checkOut: "2025-02-02",
    guests: 4,
    packages: ["Full Board", "Airport Pickup", "Honeymoon Package"],
    total: 58000,
    status: "pending",
    createdAt: "2025-01-26",
  },
  {
    id: "BK-20250127-001",
    guestName: "Ananya Das",
    email: "ananya@email.com",
    phone: "+91 76543 21098",
    room: "Deluxe Room",
    checkIn: "2025-01-30",
    checkOut: "2025-01-31",
    guests: 2,
    packages: ["Breakfast"],
    total: 4400,
    status: "confirmed",
    createdAt: "2025-01-24",
  },
  {
    id: "BK-20250126-001",
    guestName: "Vikram Singh",
    email: "vikram@email.com",
    phone: "+91 65432 10987",
    room: "Sea View Room",
    checkIn: "2025-01-31",
    checkOut: "2025-02-03",
    guests: 3,
    packages: ["Temple Darshan", "Full Board"],
    total: 24600,
    status: "cancelled",
    createdAt: "2025-01-23",
  },
];

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null);

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="h-7 w-7 text-primary" />
          Bookings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage all reservations and booking status
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or booking ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-sm">
                      {booking.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.guestName}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.guests} guests
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.room}</TableCell>
                    <TableCell>{booking.checkIn}</TableCell>
                    <TableCell>{booking.checkOut}</TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(booking.total)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Booking Detail Modal */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-muted-foreground">
                  {selectedBooking.id}
                </span>
                <Badge className={getStatusColor(selectedBooking.status)}>
                  {selectedBooking.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Guest Name</p>
                  <p className="font-medium">{selectedBooking.guestName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedBooking.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedBooking.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Guests</p>
                  <p className="font-medium">{selectedBooking.guests}</p>
                </div>
              </div>

              <div className="p-4 bg-accent/30 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Room</span>
                  <span className="font-medium">{selectedBooking.room}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="font-medium">{selectedBooking.checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out</span>
                  <span className="font-medium">{selectedBooking.checkOut}</span>
                </div>
              </div>

              {selectedBooking.packages.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Packages</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedBooking.packages.map((pkg) => (
                      <Badge key={pkg} variant="secondary">
                        {pkg}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="font-medium text-lg">Total Amount</span>
                <span className="font-bold text-xl text-primary">
                  {formatPrice(selectedBooking.total)}
                </span>
              </div>

              {selectedBooking.status === "pending" && (
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
