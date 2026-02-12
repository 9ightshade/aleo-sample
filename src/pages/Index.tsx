import { useState } from "react";
import WalletConnect from "@/components/WalletConnect";
import AddressSearch from "@/components/AddressSearch";
import WalletDetails from "@/components/WalletDetails";

const Index = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [searchedAddress, setSearchedAddress] = useState<string | null>(null);

  const handleConnect = (address: string) => {
    setWalletAddress(address);
    setConnected(true);
    setSearchedAddress(null);
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setConnected(false);
  };

  const handleSearch = (address: string) => {
    setSearchedAddress(address);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-gradient font-bold text-lg">A</span>
            </div>
            <h1 className="text-lg font-semibold text-foreground">
              Aleo{" "}
              <span className="text-muted-foreground font-normal">
                Explorer
              </span>
            </h1>
          </div>
          <WalletConnect
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            connected={connected}
            address={walletAddress}
          />
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-10">
          {/* Hero */}
          <div className="text-center space-y-3 max-w-xl">
            <h2 className="text-3xl font-bold text-foreground">
              Explore the <span className="text-gradient">Aleo Network</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connect your wallet or search any address to view balances,
              transactions, and program deployments on Aleo.
            </p>
          </div>

          {/* Search */}
          <AddressSearch onSearch={handleSearch} />

          {/* Details */}
          <WalletDetails
            address={walletAddress}
            connected={connected}
            searchedAddress={searchedAddress}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
