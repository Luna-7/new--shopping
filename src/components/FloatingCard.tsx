import React from 'react';
import { X, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { ProductItem } from '../types';
import { useOmnilink } from '../context/OmnilinkContext';

interface FloatingProductCardProps {
  product: ProductItem | null;
  onDismiss: () => void;
  onExpandDetail: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
}

export const FloatingCard: React.FC<FloatingProductCardProps> = ({
  product,
  onDismiss,
  onExpandDetail,
  onAddToCart,
}) => {
  const { showToast } = useOmnilink();

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300">
      {/* Backdrop tap to dismiss */}
      <div
        className="absolute inset-0"
        onClick={onDismiss}
        aria-hidden="true"
      />

      {/* Bottom Sheet Modal */}
      <div
        className="relative z-10 w-full max-w-lg rounded-t-3xl bg-[#FBF9F5] p-6 shadow-2xl border-t border-[#E5E0D7] animate-in slide-in-from-bottom duration-300 pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle & close button */}
        <div className="flex items-center justify-between pb-3">
          <div className="h-1 w-10 rounded-full bg-[#9E9A91]/40 mx-auto" />
          <button
            onClick={onDismiss}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F1EA] text-[#737069] hover:text-[#1A1A18] transition-colors"
            title="Close preview"
          >
            <X size={16} />
          </button>
        </div>

        {/* Clickable body to open full detail */}
        <div
          onClick={() => onExpandDetail(product)}
          className="group cursor-pointer select-none"
        >
          {/* Main Image with store badge */}
          <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-[#F4F1EA] shadow-inner">
            <img
              src={product.mainImage}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 rounded-md bg-[#FBF9F5]/90 px-2.5 py-1 text-[11px] font-medium tracking-tight text-[#1A1A18] backdrop-blur-xs shadow-xs">
              {product.storeName}
            </div>
          </div>

          {/* Title & Price */}
          <div className="mt-4 flex items-baseline justify-between gap-3">
            <h3 className="font-editorial text-2xl font-normal text-[#1A1A18] leading-tight">
              {product.name}
            </h3>
            <span className="text-lg font-semibold text-[#1A1A18]">
              {product.formattedPrice}
            </span>
          </div>

          <p className="mt-1 text-xs text-[#737069]">by {product.creator}</p>

          {/* AI Summary Capsule */}
          <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-[#6C5CE7]/20 bg-[#F0EDFD]/70 p-3 text-xs text-[#1A1A18] leading-relaxed">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-[#6C5CE7]" />
            <p>{product.aiSummary}</p>
          </div>

          {/* Prompt to expand */}
          <div className="mt-3 flex items-center justify-end gap-1 text-[11px] font-medium text-[#6C5CE7] group-hover:translate-x-0.5 transition-transform">
            <span>Tap card to view spatial gallery</span>
            <ArrowRight size={12} />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              onAddToCart(product);
              onDismiss();
            }}
            className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#E5E0D7] bg-white text-xs font-semibold text-[#1A1A18] hover:bg-[#F4F1EA] active:scale-98 transition-all shadow-xs"
          >
            <ShoppingBag size={14} />
            <span>Add to Selection</span>
          </button>
          <button
            onClick={() => {
              onAddToCart(product);
              onDismiss();
              showToast(`⚡ Order reserved for ${product.name}`);
            }}
            className="flex h-11 items-center justify-center rounded-xl bg-[#1A1A18] text-xs font-semibold text-white hover:bg-[#242320] active:scale-98 transition-all shadow-md"
          >
            <span>Acquire {product.formattedPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
