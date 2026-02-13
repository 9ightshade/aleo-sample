import { useState } from "react";
import { Wallet, Power, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface WalletConnectProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
  connected: boolean;
  address: string | null;
}

const MOCK_ADDRESS =
  "aleo1qnr3gfew3u4lndevh7kcmjhsqhp8xaqvs6v48rsmu84ydtfvcgsa5fk2e";

const WalletConnect = ({
  onConnect,
  onDisconnect,
  connected,
  address,
}: WalletConnectProps) => {
  const [copied, setCopied] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    await new Promise((r) => setTimeout(r, 1200));
    onConnect(MOCK_ADDRESS);
    setConnecting(false);
  };

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncate = (addr: string) => `${addr.slice(0, 12)}...${addr.slice(-8)}`;

  if (!connected) {
    return (
      <Button
        onClick={handleConnect}
        disabled={connecting}
        className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold px-6 py-3 text-sm transition-all duration-300">
        <Wallet className="w-4 h-4 mr-2" />
        {connecting ? "Connecting..." : "Connect Wallet"}
      </Button>

    
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-2 border border-border">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="font-mono text-sm text-foreground">
          {truncate(address!)}
        </span>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-colors">
          {copied ? (
            <Check className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
      <Button
        onClick={onDisconnect}
        variant="outline"
        size="icon"
        className="border-border text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-all">
        <Power className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default WalletConnect;
