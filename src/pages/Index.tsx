import { useState } from "react";
import { Button } from "@/components/ui/button";
import WalletConnect from "@/components/WalletConnect";
import Dashboard from "@/components/Dashboard";
import { Shield, Users, Lock, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-lending-circles.jpg";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);

  // Mock connection state for demo
  const handleGetStarted = () => {
    setIsConnected(true);
  };

  if (isConnected) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => setIsConnected(false)}
                className="flex items-center space-x-3 hover:bg-transparent p-0"
              >
                <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Lending Circles</h1>
              </Button>
            </div>
            <WalletConnect />
          </header>
          <Dashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        <img
          src={heroImage}
          alt="Community lending circles"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Borrow Together,{" "}
              <span className="text-white drop-shadow-lg">
                Privately
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Join trusted community lending circles where members pool resources and take turns accessing funds. 
              Your contributions stay encrypted while ensuring complete fairness.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-white text-primary hover:bg-white/90 transition-all shadow-large text-lg px-8 py-4"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 transition-all text-lg px-8 py-4"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Community-Powered Lending
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of collaborative finance with privacy-first technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4 p-8 rounded-2xl bg-gradient-card shadow-soft border border-border/50">
              <div className="mx-auto h-16 w-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">Private & Secure</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your contribution amounts are encrypted and private. Only you know what you put in, 
                but the system ensures fairness for everyone.
              </p>
            </div>

            <div className="text-center space-y-4 p-8 rounded-2xl bg-gradient-card shadow-soft border border-border/50">
              <div className="mx-auto h-16 w-16 bg-secondary rounded-2xl flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">Community Driven</h3>
              <p className="text-muted-foreground leading-relaxed">
                Build trust with your community. Form circles with people you know and trust, 
                or join existing circles with verified members.
              </p>
            </div>

            <div className="text-center space-y-4 p-8 rounded-2xl bg-gradient-card shadow-soft border border-border/50">
              <div className="mx-auto h-16 w-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">Blockchain Secured</h3>
              <p className="text-muted-foreground leading-relaxed">
                Smart contracts ensure automatic and transparent fund distribution. 
                No central authority needed - the code is the contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Join a Lending Circle?
            </h2>
            <p className="text-xl text-white/90">
              Start building financial trust within your community. Create or join circles that match your needs.
            </p>
            <div className="pt-4">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-white text-primary hover:bg-white/90 transition-all shadow-large text-lg px-8 py-4"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
