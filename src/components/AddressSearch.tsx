import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AddressSearchProps {
  onSearch: (address: string) => void;
}

const AddressSearch = ({ onSearch }: AddressSearchProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Aleo address (aleo1...)"
        className="pl-11 pr-4 py-6 bg-card border-border text-foreground placeholder:text-muted-foreground font-mono text-sm rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
      />
    </form>
  );
};

export default AddressSearch;
