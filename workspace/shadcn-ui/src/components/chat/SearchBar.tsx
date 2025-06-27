import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="p-3 bg-gray-100">
      <div className="relative">
        <Search 
          size={16}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full pl-10 pr-3 py-2 bg-white rounded-full text-sm border-none focus:outline-none focus:ring-1 focus:ring-emerald-400"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}