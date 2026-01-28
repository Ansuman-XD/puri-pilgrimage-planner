import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IndianRupee,
  Calendar,
  Star,
  TrendingUp,
  Users,
  Package,
} from "lucide-react";
import { hotelInfo, rooms, packages, reviews, formatPrice } from "@/lib/data";

const stats = [
  {
    title: "Total Revenue",
    value: "₹12,45,000",
    change: "+18% from last month",
    icon: IndianRupee,
    trend: "up",
  },
  {
    title: "Total Bookings",
    value: "156",
    change: "+12% from last month",
    icon: Calendar,
    trend: "up",
  },
  {
    title: "Average Rating",
    value: hotelInfo.rating.toString(),
    change: `${hotelInfo.totalReviews} reviews`,
    icon: Star,
    trend: "neutral",
  },
  {
    title: "Occupancy Rate",
    value: "78%",
    change: "+5% from last month",
    icon: TrendingUp,
    trend: "up",
  },
];

const recentBookings = [
  { id: "BK001", guest: "Priya Sharma", room: "Sea View Room", checkIn: "2025-01-28", status: "confirmed" },
  { id: "BK002", guest: "Rahul Patel", room: "Premium Suite", checkIn: "2025-01-29", status: "pending" },
  { id: "BK003", guest: "Ananya Das", room: "Deluxe Room", checkIn: "2025-01-30", status: "confirmed" },
  { id: "BK004", guest: "Vikram Singh", room: "Sea View Room", checkIn: "2025-01-31", status: "confirmed" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening at {hotelInfo.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                  <p className={`text-xs mt-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-muted-foreground"
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-accent/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">{booking.guest}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.room} • {booking.checkIn}
                    </p>
                  </div>
                  <Badge
                    variant={booking.status === "confirmed" ? "default" : "secondary"}
                  >
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Property Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">Total Rooms</span>
                </div>
                <span className="font-bold text-foreground">{rooms.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">Active Packages</span>
                </div>
                <span className="font-bold text-foreground">{packages.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">Total Reviews</span>
                </div>
                <span className="font-bold text-foreground">{reviews.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">This Month Revenue</span>
                </div>
                <span className="font-bold text-foreground">₹4,85,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Latest Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="p-4 border border-border rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">{review.guestName}</p>
                    <p className="text-sm text-muted-foreground">{review.roomType}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
