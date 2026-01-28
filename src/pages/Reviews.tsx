import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { hotelInfo, reviews } from "@/lib/data";
import { Star, TrendingUp } from "lucide-react";

const Reviews = () => {
  const [filter, setFilter] = useState<number | null>(null);

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }));

  const filteredReviews = filter
    ? reviews.filter((r) => r.rating === filter)
    : reviews;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-accent/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              ⭐ Verified Reviews
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Guest Reviews
            </h1>
            <p className="text-lg text-muted-foreground">
              See what our guests say about their stay at {hotelInfo.name}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rating Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-foreground mb-2">
                      {hotelInfo.rating}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(hotelInfo.rating)
                              ? "text-primary fill-primary"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {hotelInfo.totalReviews.toLocaleString()} reviews
                    </p>
                  </div>

                  <div className="space-y-3">
                    {ratingCounts.map(({ rating, count, percentage }) => (
                      <button
                        key={rating}
                        onClick={() => setFilter(filter === rating ? null : rating)}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                          filter === rating
                            ? "bg-primary/10"
                            : "hover:bg-accent"
                        }`}
                      >
                        <span className="text-sm font-medium w-12">{rating} star</span>
                        <Progress value={percentage} className="flex-1 h-2" />
                        <span className="text-sm text-muted-foreground w-8">
                          {count}
                        </span>
                      </button>
                    ))}
                  </div>

                  {filter && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => setFilter(null)}
                    >
                      Clear filter
                    </Button>
                  )}

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span>Top rated in Puri</span>
                    </div>
                    <Button asChild className="w-full">
                      <Link to="/rooms">Book Your Stay</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {filter ? `${filter}-Star Reviews` : "All Reviews"}
                </h2>
                <span className="text-sm text-muted-foreground">
                  Showing {filteredReviews.length} reviews
                </span>
              </div>

              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              {filteredReviews.length === 0 && (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">
                    No reviews found with this filter.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setFilter(null)}
                    className="mt-2"
                  >
                    View all reviews
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;
