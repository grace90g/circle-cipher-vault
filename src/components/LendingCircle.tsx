import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, Shield, TrendingUp } from "lucide-react";

interface Member {
  id: string;
  name: string;
  avatar?: string;
  isNext: boolean;
  hasPaid: boolean;
}

interface LendingCircleProps {
  id: string;
  name: string;
  totalAmount: string; // Encrypted display
  members: Member[];
  currentRound: number;
  totalRounds: number;
  nextPaymentDate: string;
  status: "active" | "forming" | "completed";
  isJoined: boolean;
  onViewDetails?: () => void;
  onJoinCircle?: () => void;
}

const LendingCircle = ({
  name,
  totalAmount,
  members,
  currentRound,
  totalRounds,
  nextPaymentDate,
  status,
  isJoined,
  onViewDetails,
  onJoinCircle,
}: LendingCircleProps) => {
  const progress = (currentRound / totalRounds) * 100;
  
  const statusColors = {
    active: "bg-secondary text-secondary-foreground",
    forming: "bg-primary text-primary-foreground",
    completed: "bg-muted text-muted-foreground",
  };

  return (
    <Card className="group hover:shadow-medium transition-all bg-gradient-card border-border/50">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>{totalAmount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{members.length} members</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{nextPaymentDate}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-card-foreground font-medium">
              Round {currentRound} of {totalRounds}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-card-foreground">Members</p>
          <div className="flex -space-x-2">
            {members.slice(0, 6).map((member) => (
              <Avatar
                key={member.id}
                className={`border-2 transition-all ${
                  member.isNext
                    ? "border-secondary z-10 ring-2 ring-secondary/20"
                    : member.hasPaid
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs bg-gradient-subtle">
                  {member.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {members.length > 6 && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-muted text-xs text-muted-foreground">
                +{members.length - 6}
              </div>
            )}
          </div>
        </div>

        <div className="pt-2">
          {!isJoined ? (
            <Button 
              onClick={onJoinCircle}
              className="w-full bg-gradient-primary hover:opacity-90 transition-all"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Join Circle
            </Button>
          ) : (
            <Button 
              onClick={onViewDetails}
              variant="outline" 
              className="w-full border-primary/20 hover:bg-primary/5"
            >
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LendingCircle;