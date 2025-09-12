import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useContract } from "@/hooks/useContract";
import { Plus, Users, DollarSign, Calendar, Shield, Loader2 } from "lucide-react";

interface CreateCircleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCircleModal = ({ open, onOpenChange }: CreateCircleModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    totalAmount: "",
    currency: "USDC",
    maxMembers: "5",
    paymentFrequency: "monthly",
    startDate: "",
  });
  const { toast } = useToast();
  const { createLendingCircle, loading } = useContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.totalAmount || !formData.startDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const totalMembers = parseInt(formData.maxMembers);
    const contributionAmount = parseInt(formData.totalAmount) / totalMembers;
    const startDate = new Date(formData.startDate);
    const duration = 30 * 24 * 60 * 60; // 30 days in seconds

    const hash = await createLendingCircle(
      formData.name,
      formData.description,
      totalMembers,
      contributionAmount,
      duration
    );

    if (hash) {
      onOpenChange(false);
      setFormData({
        name: "",
        description: "",
        totalAmount: "",
        currency: "USDC",
        maxMembers: "5",
        paymentFrequency: "monthly",
        startDate: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gradient-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground flex items-center gap-2">
            <Plus className="h-6 w-6 text-primary" />
            Create New Lending Circle
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-card-foreground font-medium">Circle Name</Label>
            <Input
              id="name"
              placeholder="e.g., Tech Professionals Circle"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-card-foreground font-medium">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose and goals of your lending circle..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="bg-background border-border"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalAmount" className="text-card-foreground font-medium flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Total Pool Amount
              </Label>
              <Input
                id="totalAmount"
                type="number"
                placeholder="10000"
                value={formData.totalAmount}
                onChange={(e) => setFormData({...formData, totalAmount: e.target.value})}
                required
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency" className="text-card-foreground font-medium">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="DAI">DAI</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxMembers" className="text-card-foreground font-medium flex items-center gap-1">
                <Users className="h-4 w-4" />
                Maximum Members
              </Label>
              <Select value={formData.maxMembers} onValueChange={(value) => setFormData({...formData, maxMembers: value})}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Members</SelectItem>
                  <SelectItem value="4">4 Members</SelectItem>
                  <SelectItem value="5">5 Members</SelectItem>
                  <SelectItem value="6">6 Members</SelectItem>
                  <SelectItem value="8">8 Members</SelectItem>
                  <SelectItem value="10">10 Members</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentFrequency" className="text-card-foreground font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Payment Frequency
              </Label>
              <Select value={formData.paymentFrequency} onValueChange={(value) => setFormData({...formData, paymentFrequency: value})}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-card-foreground font-medium">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-secondary">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Privacy Notice</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Individual contribution amounts will be encrypted. Only aggregate totals and payment schedules are visible to members.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:opacity-90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Circle"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCircleModal;