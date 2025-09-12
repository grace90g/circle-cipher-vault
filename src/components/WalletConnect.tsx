import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, CheckCircle } from "lucide-react";
import { useConnectModal, useAccount, useDisconnect } from '@rainbow-me/rainbowkit';
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const WalletConnect = () => {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  useEffect(() => {
    if (isConnected && address) {
      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
    }
  }, [isConnected, address, toast]);

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been safely disconnected",
    });
  };

  if (isConnected && address) {
    return (
      <Card className="flex items-center gap-3 bg-gradient-card shadow-soft border-primary/20 px-4 py-3">
        <CheckCircle className="h-5 w-5 text-secondary" />
        <div className="flex-1">
          <p className="text-sm font-medium text-card-foreground">Connected</p>
          <p className="text-xs text-muted-foreground">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          className="hover:bg-destructive/10 hover:text-destructive border-border"
        >
          Disconnect
        </Button>
      </Card>
    );
  }

  return (
    <Button
      onClick={openConnectModal}
      className="bg-gradient-primary hover:opacity-90 transition-all shadow-soft"
      size="lg"
    >
      <Wallet className="mr-2 h-5 w-5" />
      Connect Wallet
    </Button>
  );
};

export default WalletConnect;