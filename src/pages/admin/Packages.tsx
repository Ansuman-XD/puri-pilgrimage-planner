import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { packages, formatPrice } from "@/lib/data";
import { Package, Plus, Edit, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminPackages = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<typeof packages[0] | null>(null);

  const handleSave = () => {
    toast({
      title: editingPackage ? "Package Updated" : "Package Created",
      description: "Your changes have been saved successfully.",
    });
    setIsDialogOpen(false);
    setEditingPackage(null);
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Package Deleted",
      description: "The package has been removed.",
    });
  };

  const categories = [...new Set(packages.map((p) => p.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            <Package className="h-7 w-7 text-primary" />
            Package Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage experience packages
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPackage(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif">
                {editingPackage ? "Edit Package" : "New Package"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Package Name</Label>
                <Input placeholder="e.g., Temple Darshan Assistance" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe the package..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input type="number" placeholder="800" />
                </div>
                <div className="space-y-2">
                  <Label>Pricing Type</Label>
                  <Select defaultValue="per_person">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per_person">Per Person</SelectItem>
                      <SelectItem value="per_day">Per Day</SelectItem>
                      <SelectItem value="per_booking">Per Booking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue="Experience">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Icon (Emoji)</Label>
                <Input placeholder="🛕" className="text-2xl" />
              </div>
              <Button className="w-full" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Package
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Packages by Category */}
      {categories.map((category) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="font-serif text-lg">{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {packages
                .filter((p) => p.category === category)
                .map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex items-center justify-between p-4 bg-accent/30 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{pkg.icon}</span>
                      <div>
                        <p className="font-medium text-foreground">{pkg.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {pkg.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-foreground">
                          {formatPrice(pkg.price)}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {pkg.priceType.replace("per_", "/")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingPackage(pkg);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(pkg.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminPackages;
