import React from 'react';
import { Globe, User, ShoppingBag } from 'lucide-react';
import { useOmnilink } from '../context/OmnilinkContext';
import { MainTab } from '../types';

export const BottomBar: React.FC = () => {
  const { mainTab, selectTab, cartCount } = useOmnilink();

  const navItems: { tab: MainTab; label: string; icon: React.ReactNode }[] = [
    {
      tab: 'WORLD',
      label: 'Home',
      icon: <Globe size={18} strokeWidth={1.8} />,
    },
    {
      tab: 'PERSONAL',
      label: 'Personal',
      icon: <User size={18} strokeWidth={1.8} />,
    },
    {
      tab: 'CART',
      label: 'Cart',
      icon: <ShoppingBag size={18} strokeWidth={1.8} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-md border-t border-[#E5E0D7]/60 pb-safe">
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2">
        {navItems.map(({ tab, label, icon }) => {
          const isSelected = mainTab === tab;
          return (
            <button
              key={tab}
              onClick={() => selectTab(tab)}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-[#F4F1EA] text-[#1A1A18] font-medium shadow-xs'
                  : 'text-[#737069] hover:text-[#1A1A18]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={isSelected ? 'text-[#6C5CE7]' : 'text-current'}
                >
                  {icon}
                </span>

                {/* Badge count for cart */}
                {tab === 'CART' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6C5CE7] px-1 text-[9px] font-bold text-white shadow-xs">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>

              <span className="text-xs tracking-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
