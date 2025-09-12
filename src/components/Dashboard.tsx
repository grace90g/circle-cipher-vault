import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LendingCircle from "./LendingCircle";
import CreateCircleModal from "./CreateCircleModal";
import CircleDetailsModal from "./CircleDetailsModal";
import JoinCircleModal from "./JoinCircleModal";
import { Plus, TrendingUp, Users, Shield, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for lending circles
const mockCircles = [
  {
    id: "1",
    name: "Tech Professionals Circle",
    totalAmount: "••••• USDC",
    members: [
      { id: "1", name: "Alice Chen", isNext: true, hasPaid: true },
      { id: "2", name: "Bob Kumar", isNext: false, hasPaid: true },
      { id: "3", name: "Carol Smith", isNext: false, hasPaid: false },
      { id: "4", name: "David Lee", isNext: false, hasPaid: false },
      { id: "5", name: "Eva Martinez", isNext: false, hasPaid: false },
    ],
    currentRound: 2,
    totalRounds: 5,
    nextPaymentDate: "Dec 15, 2024",
    status: "active" as const,
    isJoined: true,
  },
  {
    id: "2", 
    name: "Creative Collective",
    totalAmount: "••••• ETH",
    members: [
      { id: "6", name: "Frank Wilson", isNext: false, hasPaid: true },
      { id: "7", name: "Grace Taylor", isNext: false, hasPaid: true },
      { id: "8", name: "Henry Brown", isNext: false, hasPaid: false },
    ],
    currentRound: 1,
    totalRounds: 8,
    nextPaymentDate: "Dec 20, 2024", 
    status: "forming" as const,
    isJoined: false,
  },
  {
    id: "3",
    name: "Community Builders",
    totalAmount: "••••• DAI",
    members: [
      { id: "9", name: "Ivy Johnson", isNext: false, hasPaid: true },
      { id: "10", name: "Jack Davis", isNext: false, hasPaid: true },
      { id: "11", name: "Kelly White", isNext: false, hasPaid: true },
      { id: "12", name: "Liam Green", isNext: false, hasPaid: true },
    ],
    currentRound: 4,
    totalRounds: 4,
    nextPaymentDate: "Completed",
    status: "completed" as const,
    isJoined: true,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"all" | "joined" | "available">("all");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<typeof mockCircles[0] | null>(null);
  const [circles, setCircles] = useState(mockCircles);
  const { toast } = useToast();

  const filteredCircles = circles.filter((circle) => {
    if (activeTab === "joined") return circle.isJoined;
    if (activeTab === "available") return !circle.isJoined && circle.status === "forming";
    return true;
  });

  const stats = {
    totalCircles: circles.filter(c => c.isJoined).length,
    activeCircles: circles.filter(c => c.isJoined && c.status === "active").length,
    totalSaved: "••••• USDC",
    trustScore: 95,
  };

  const handleViewDetails = (circle: typeof mockCircles[0]) => {
    setSelectedCircle(circle);
    setDetailsModalOpen(true);
  };

  const handleJoinCircle = (circle: typeof mockCircles[0]) => {
    setSelectedCircle(circle);
    setJoinModalOpen(true);
  };

  const handleJoinSuccess = () => {
    if (selectedCircle) {
      setCircles(prev => prev.map(c => 
        c.id === selectedCircle.id 
          ? { ...c, isJoined: true, members: [...c.members, { 
              id: `new-${Date.now()}`, 
              name: "You", 
              isNext: false, 
              hasPaid: false 
            }]}
          : c
      ));
      
      toast({
        title: "Welcome to the Circle!",
        description: `You've successfully joined "${selectedCircle.name}".`,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-soft border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Circles
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{stats.activeCircles}</div>
            <p className="text-xs text-muted-foreground">
              of {stats.totalCircles} joined
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Saved
            </CardTitle>
            <DollarSign className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{stats.totalSaved}</div>
            <p className="text-xs text-muted-foreground">
              Across all circles
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Community Size
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {mockCircles.reduce((acc, circle) => acc + circle.members.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total connections
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Trust Score
            </CardTitle>
            <Shield className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{stats.trustScore}%</div>
            <p className="text-xs text-muted-foreground">
              Excellent standing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Circles Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Lending Circles</h2>
            <p className="text-muted-foreground">Manage your community lending activities</p>
          </div>
          <Button 
            onClick={() => setCreateModalOpen(true)}
            className="bg-gradient-primary hover:opacity-90 transition-all shadow-soft"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Circle
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
              {(["all", "joined", "available"] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab)}
                  className={
                    activeTab === tab
                      ? "bg-background text-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  }
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === "available" && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {circles.filter(c => !c.isJoined && c.status === "forming").length}
                    </Badge>
                  )}
                </Button>
              ))}
        </div>

        {/* Circles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCircles.map((circle) => (
              <LendingCircle 
                key={circle.id} 
                {...circle} 
                onViewDetails={() => handleViewDetails(circle)}
                onJoinCircle={() => handleJoinCircle(circle)}
              />
            ))}
          </div>

        {filteredCircles.length === 0 && (
          <Card className="p-8 text-center bg-gradient-subtle border-border/50">
            <div className="space-y-3">
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-card-foreground">
                No circles found
              </h3>
              <p className="text-muted-foreground">
                {activeTab === "joined" 
                  ? "You haven't joined any circles yet."
                  : activeTab === "available"
                  ? "No circles are currently accepting new members."
                  : "No circles available."}
              </p>
              <Button 
                onClick={() => setCreateModalOpen(true)}
                className="bg-gradient-primary hover:opacity-90 transition-all"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Circle
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      {/* Modals */}
      <CreateCircleModal 
        open={createModalOpen} 
        onOpenChange={setCreateModalOpen} 
      />
      
      <CircleDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        circle={selectedCircle}
        onJoinCircle={() => {
          setDetailsModalOpen(false);
          if (selectedCircle) handleJoinCircle(selectedCircle);
        }}
      />
      
      <JoinCircleModal
        open={joinModalOpen}
        onOpenChange={setJoinModalOpen}
        circleName={selectedCircle?.name || ""}
        onJoinSuccess={handleJoinSuccess}
      />
    </div>
  );
};

export default Dashboard;