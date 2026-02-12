import { Coins, Shield, Activity, Hash, Clock, Globe } from "lucide-react";

interface WalletDetailsProps {
  address: string | null;
  connected: boolean;
  searchedAddress: string | null;
}

const MOCK_DATA = {
  balance: "142.587 ALEO",
  publicBalance: "120.000 ALEO",
  privateBalance: "22.587 ALEO",
  programs: 7,
  transactions: 34,
  lastActive: "2 hours ago",
  network: "Mainnet",
  nonce: "4829103",
};

const InfoCard = ({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: any;
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group">
    <div className="flex items-center gap-3 mb-3">
      <div
        className={`p-2 rounded-lg ${accent ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"} group-hover:bg-primary/10 group-hover:text-primary transition-colors`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </span>
    </div>
    <p
      className={`text-lg font-semibold font-mono ${accent ? "text-gradient" : "text-foreground"}`}>
      {value}
    </p>
  </div>
);

const WalletDetails = ({
  address,
  connected,
  searchedAddress,
}: WalletDetailsProps) => {
  const displayAddress = searchedAddress || address;

  if (!displayAddress) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Shield className="w-12 h-12 mb-4 opacity-30" />
        <p className="text-sm">
          Connect your wallet or search an address to view details
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Address display */}
      <div className="bg-card border border-border rounded-xl p-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
          {searchedAddress ? "Searched Address" : "Connected Wallet"}
        </p>
        <p className="font-mono text-sm text-foreground break-all leading-relaxed">
          {displayAddress}
        </p>
        {connected && !searchedAddress && (
          <span className="inline-flex items-center gap-1.5 mt-3 text-xs text-primary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Connected
          </span>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard
          icon={Coins}
          label="Total Balance"
          value={MOCK_DATA.balance}
          accent
        />
        <InfoCard
          icon={Shield}
          label="Public Balance"
          value={MOCK_DATA.publicBalance}
        />
        <InfoCard
          icon={Shield}
          label="Private Balance"
          value={MOCK_DATA.privateBalance}
        />
        <InfoCard
          icon={Activity}
          label="Programs Deployed"
          value={String(MOCK_DATA.programs)}
        />
        <InfoCard
          icon={Hash}
          label="Transactions"
          value={String(MOCK_DATA.transactions)}
        />
        <InfoCard
          icon={Clock}
          label="Last Active"
          value={MOCK_DATA.lastActive}
        />
      </div>

      {/* Network info */}
      <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Network</span>
        </div>
        <span className="font-mono text-sm text-foreground font-medium">
          {MOCK_DATA.network}
        </span>
      </div>
    </div>
  );
};

export default WalletDetails;
