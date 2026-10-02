import React from 'react';
import { Search } from 'lucide-react';
import { useOmnilink } from '../context/OmnilinkContext';

export const Header: React.FC = () => {
  const { setSearchOpen } = useOmnilink();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FBF9F5]/90 backdrop-blur-md transition-colors">
      <div className="flex items-center justify-between px-6 py-3.5">
        {/* Editorial Serif Logo */}
        <div className="flex items-center gap-2">
          <span className="font-editorial text-2xl font-normal tracking-tight text-[#1A1A18]">
            Omnilink
          </span>
          <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-[#6C5CE7]/10 text-[#6C5CE7] font-semibold">
            Editorial
          </span>
        </div>

        {/* Lightweight Search Icon Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#EBE7DF]/60 active:scale-95 transition-all text-[#1A1A18]"
          title="Search space"
          aria-label="Search space"
        >
          <Search size={20} strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
};
