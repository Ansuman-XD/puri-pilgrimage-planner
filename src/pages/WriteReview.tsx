import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { hotelInfo } from "@/lib/data";
import { Star, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const WriteReview = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In a real app, we'd verify the booking ID
  const isValidBooking = bookingId && bookingId.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Review Submitted!",
      description: "Thank you for sharing your experience with us.",
    });
    
    navigate("/reviews");
  };

  const ratingLabels = [
    "",
    "Poor",
    "Fair",
    "Good",
    "Very Good",
    "Excellent",
  ];

  if (!isValidBooking) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-lg mx-auto text-center p-8">
              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
                Invalid Booking
              </h1>
              <p className="text-muted-foreground mb-6">
                We couldn't find this booking. Reviews can only be submitted by verified guests.
              </p>
              <Button onClick={() => navigate("/")}>
                Go to Homepage
              </Button>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 pb-12 bg-gradient-to-b from-accent/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              ✍️ Share Your Experience
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Write a Review
            </h1>
            <p className="text-lg text-muted-foreground">
              Your feedback helps other travelers and helps us improve.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="font-serif text-xl">
                How was your stay at {hotelInfo.name}?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Star Rating */}
                <div className="space-y-4">
                  <Label className="text-base">Your Rating *</Label>
                  <div className="flex flex-col items-center gap-4 p-6 bg-accent/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star
                            className={cn(
                              "h-10 w-10 transition-colors",
                              star <= (hoveredRating || rating)
                                ? "text-primary fill-primary"
                                : "text-muted-foreground/30"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                    <p className={cn(
                      "text-lg font-medium transition-opacity",
                      (hoveredRating || rating) > 0 ? "opacity-100" : "opacity-0"
                    )}>
                      {ratingLabels[hoveredRating || rating]}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                  <Label htmlFor="comment" className="text-base">
                    Your Review (Optional)
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Share the highlights of your stay..."
                    rows={6}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    Tips: Mention the room, service, food, location, or any standout experiences.
                  </p>
                </div>

                {/* Guidelines */}
                <Card className="bg-accent/30 border-none">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Review Guidelines
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Be honest and helpful to other travelers</li>
                      <li>• Focus on your experience at the hotel</li>
                      <li>• Avoid personal information or offensive language</li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting || rating === 0}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WriteReview;
