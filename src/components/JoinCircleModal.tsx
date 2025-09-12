import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  DollarSign 
} from "lucide-react";

interface JoinCircleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circleName: string;
  onJoinSuccess?: () => void;
}

const JoinCircleModal = ({ open, onOpenChange, circleName, onJoinSuccess }: JoinCircleModalProps) => {
  const [contributionAmount, setContributionAmount] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { toast } = useToast();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms || !agreedToPrivacy) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsJoining(true);
    
    // Mock joining process
    setTimeout(() => {
      toast({
        title: "Successfully Joined!",
        description: `Welcome to "${circleName}". Your contribution has been encrypted and recorded.`,
      });
      
      onJoinSuccess?.();
      onOpenChange(false);
      setIsJoining(false);
      setContributionAmount("");
      setAgreedToTerms(false);
      setAgreedToPrivacy(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-gradient-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Join {circleName}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleJoin} className="space-y-6">
          {/* Contribution Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-card-foreground font-medium flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              Your Contribution Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount (USDC)"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(e.target.value)}
              required
              className="bg-background border-border text-lg py-3"
            />
            <p className="text-sm text-muted-foreground">
              This amount will be encrypted and only visible to you. The system ensures fair distribution.
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Privacy & Security</span>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                Your contribution amount is encrypted using zero-knowledge proofs
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                Only aggregate totals are visible to other members
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                Smart contracts ensure automatic and fair fund distribution
              </li>
            </ul>
          </div>

          {/* Risk Warning */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Important Notice</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Lending circles are based on trust and community. Only join circles with members you trust. 
              Ensure you can commit to the payment schedule before joining.
            </p>
          </div>

          {/* Agreements */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                I agree to the lending circle terms and commit to making timely payments according to the schedule.
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="privacy"
                checked={agreedToPrivacy}
                onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
              />
              <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed">
                I understand that my contribution will be encrypted and agree to the privacy policy.
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isJoining}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:opacity-90"
              disabled={isJoining || !contributionAmount || !agreedToTerms || !agreedToPrivacy}
            >
              {isJoining ? "Joining..." : "Join Circle"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinCircleModal;