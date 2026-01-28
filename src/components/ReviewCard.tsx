import { Review } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground">{review.guestName}</h4>
              {review.verified && (
                <CheckCircle className="h-4 w-4 text-primary" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {format(new Date(review.date), "MMM dd, yyyy")}
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {review.roomType}
          </Badge>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "text-primary fill-primary"
                  : "text-muted"
              }`}
            />
          ))}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          "{review.comment}"
        </p>
      </CardContent>
    </Card>
  );
};
