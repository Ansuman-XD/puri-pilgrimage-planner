import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, CreditCard, Phone, FileText, MessageCircle, Save } from "lucide-react";
import { hotelInfo } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
          <Settings className="h-7 w-7 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your hotel settings and configurations
        </p>
      </div>

      <Tabs defaultValue="payment" className="space-y-6">
        <TabsList className="w-full flex-wrap h-auto gap-2 bg-transparent p-0">
          <TabsTrigger value="payment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Phone className="mr-2 h-4 w-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="policies" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="mr-2 h-4 w-4" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </TabsTrigger>
        </TabsList>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">Payment Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium">UPI Payments</p>
                    <p className="text-sm text-muted-foreground">Accept payments via UPI</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium">Card Payments</p>
                    <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, RuPay</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium">Net Banking</p>
                    <p className="text-sm text-muted-foreground">Accept bank transfers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="space-y-2">
                  <Label>Razorpay Key ID</Label>
                  <Input type="password" placeholder="rzp_live_*************" />
                </div>
                <div className="space-y-2">
                  <Label>Razorpay Key Secret</Label>
                  <Input type="password" placeholder="••••••••••••••••" />
                </div>
              </div>

              <Button onClick={handleSave} disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Phone</Label>
                  <Input defaultValue={hotelInfo.phone} />
                </div>
                <div className="space-y-2">
                  <Label>Secondary Phone</Label>
                  <Input placeholder="+91 98765 43211" />
                </div>
                <div className="space-y-2">
                  <Label>Reservations Email</Label>
                  <Input type="email" defaultValue={hotelInfo.email} />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input type="email" placeholder="support@puribeachresort.com" />
                </div>
              </div>

              <Button onClick={handleSave} disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies */}
        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">Hotel Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Cancellation Policy</Label>
                <Textarea
                  rows={4}
                  defaultValue="Free cancellation up to 48 hours before check-in. 50% refund for cancellations within 48 hours. No refund for no-shows."
                />
              </div>
              <div className="space-y-2">
                <Label>Check-in/Check-out Policy</Label>
                <Textarea
                  rows={4}
                  defaultValue="Check-in: 2:00 PM onwards. Check-out: 11:00 AM. Early check-in and late check-out subject to availability (charges may apply)."
                />
              </div>
              <div className="space-y-2">
                <Label>House Rules</Label>
                <Textarea
                  rows={4}
                  defaultValue="No smoking in rooms. Pets not allowed. Valid ID required at check-in. Outside food not allowed in dining areas."
                />
              </div>

              <Button onClick={handleSave} disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WhatsApp Integration */}
        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">WhatsApp Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                <div>
                  <p className="font-medium">Enable WhatsApp Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Send booking confirmations via WhatsApp
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>WhatsApp Business Number</Label>
                  <Input defaultValue={hotelInfo.phone} />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp API Key (Optional)</Label>
                  <Input type="password" placeholder="For automated messages" />
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-400">
                      WhatsApp Ready
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-500">
                      Guests can contact you directly via WhatsApp
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
