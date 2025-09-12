import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Clock, 
  Shield, 
  DollarSign, 
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  avatar?: string;
  isNext: boolean;
  hasPaid: boolean;
  trustScore?: number;
}

interface CircleDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circle: {
    id: string;
    name: string;
    totalAmount: string;
    members: Member[];
    currentRound: number;
    totalRounds: number;
    nextPaymentDate: string;
    status: "active" | "forming" | "completed";
    isJoined: boolean;
    description?: string;
    paymentFrequency?: string;
    createdDate?: string;
  } | null;
  onJoinCircle?: () => void;
}

const CircleDetailsModal = ({ open, onOpenChange, circle, onJoinCircle }: CircleDetailsModalProps) => {
  if (!circle) return null;

  const progress = (circle.currentRound / circle.totalRounds) * 100;
  const nextMember = circle.members.find(m => m.isNext);
  
  const statusColors = {
    active: "bg-secondary text-secondary-foreground",
    forming: "bg-primary text-primary-foreground",
    completed: "bg-muted text-muted-foreground",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-card border-border/50">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-3xl font-bold text-card-foreground">
              {circle.name}
            </DialogTitle>
            <Badge className={statusColors[circle.status]}>
              {circle.status.charAt(0).toUpperCase() + circle.status.slice(1)}
            </Badge>
          </div>
          
          {circle.description && (
            <p className="text-muted-foreground text-lg leading-relaxed">
              {circle.description}
            </p>
          )}
        </DialogHeader>

        <div className="space-y-8">
          {/* Circle Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium text-card-foreground">Total Pool</span>
              </div>
              <div className="text-2xl font-bold text-card-foreground">{circle.totalAmount}</div>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-secondary" />
                <span className="font-medium text-card-foreground">Members</span>
              </div>
              <div className="text-2xl font-bold text-card-foreground">{circle.members.length}</div>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium text-card-foreground">Next Payment</span>
              </div>
              <div className="text-lg font-medium text-card-foreground">{circle.nextPaymentDate}</div>
            </div>
          </div>

          {/* Progress Section */}
          {circle.status !== "forming" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-card-foreground">Circle Progress</h3>
                <span className="text-muted-foreground">
                  Round {circle.currentRound} of {circle.totalRounds}
                </span>
              </div>
              <Progress value={progress} className="h-3" />
              
              {nextMember && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-secondary">
                      <AvatarImage src={nextMember.avatar} alt={nextMember.name} />
                      <AvatarFallback className="bg-gradient-subtle">
                        {nextMember.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-card-foreground">Next to receive</p>
                      <p className="text-secondary font-semibold">{nextMember.name}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <Separator />

          {/* Members Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-card-foreground">Circle Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {circle.members.map((member) => (
                <div
                  key={member.id}
                  className={`p-4 rounded-lg border transition-all ${
                    member.isNext
                      ? "bg-secondary/10 border-secondary/20"
                      : "bg-background border-border/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className={`border-2 ${
                      member.isNext ? "border-secondary" : 
                      member.hasPaid ? "border-primary" : "border-border"
                    }`}>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-subtle">
                        {member.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-card-foreground">{member.name}</span>
                        {member.hasPaid && <CheckCircle className="h-4 w-4 text-primary" />}
                        {member.isNext && <Badge variant="secondary" className="text-xs">Next</Badge>}
                      </div>
                      {member.trustScore && (
                        <div className="flex items-center gap-1 mt-1">
                          <Shield className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Trust Score: {member.trustScore}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Circle Rules */}
          <div className="bg-muted/30 border border-border/50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Circle Rules & Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-card-foreground">Payment Frequency:</span>
                <span className="ml-2 text-muted-foreground">
                  {circle.paymentFrequency || "Monthly"}
                </span>
              </div>
              <div>
                <span className="font-medium text-card-foreground">Created:</span>
                <span className="ml-2 text-muted-foreground">
                  {circle.createdDate || "Dec 1, 2024"}
                </span>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground">
                  All contributions are encrypted and private. Smart contracts ensure automatic and fair distribution.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Close
            </Button>
            
            {!circle.isJoined && circle.status === "forming" ? (
              <Button
                onClick={() => {
                  onJoinCircle?.();
                  onOpenChange(false);
                }}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Join Circle
              </Button>
            ) : circle.isJoined ? (
              <Button
                variant="outline"
                className="flex-1 border-primary/20 hover:bg-primary/5"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Blockchain
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                className="flex-1"
              >
                Circle Full
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CircleDetailsModal;