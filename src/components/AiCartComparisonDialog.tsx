import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { ProductItem } from '../types';

interface AiCartComparisonDialogProps {
  pair: [ProductItem, ProductItem] | null;
  onClose: () => void;
}

export const AiCartComparisonDialog: React.FC<AiCartComparisonDialogProps> = ({
  pair,
  onClose,
}) => {
  if (!pair) return null;
  const [p1, p2] = pair;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#FBF9F5] p-6 shadow-2xl border border-[#E5E0D7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D7]">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#6C5CE7]" />
            <h2 className="font-editorial text-2xl font-normal text-[#1A1A18]">
              AI Object Comparison
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F4F1EA] text-[#737069]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Side by side items */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[p1, p2].map((product, idx) => (
            <div
              key={product.id}
              className="flex flex-col rounded-xl bg-white p-3.5 border border-[#E5E0D7] shadow-xs"
            >
              <div className="relative h-28 w-full overflow-hidden rounded-lg bg-[#F4F1EA]">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-1.5 left-1.5 rounded-sm bg-[#1A1A18]/80 px-1.5 py-0.5 text-[9px] text-white font-mono">
                  Item {idx + 1}
                </span>
              </div>
              <h4 className="mt-2.5 font-medium text-xs text-[#1A1A18] line-clamp-1">
                {product.name}
              </h4>
              <span className="text-xs font-semibold text-[#6C5CE7]">
                {product.formattedPrice}
              </span>
              <div className="mt-2 space-y-1 border-t border-[#F4F1EA] pt-2 text-[10px] text-[#737069]">
                <div>
                  <span className="text-[#9E9A91]">Category:</span>{' '}
                  <span className="text-[#1A1A18]">{product.category}</span>
                </div>
                <div>
                  <span className="text-[#9E9A91]">Material:</span>{' '}
                  <span className="text-[#1A1A18] line-clamp-1">
                    {product.specs['Material'] ||
                      product.specs['Timber'] ||
                      product.specs['Frame'] ||
                      product.specs['Clay Body'] ||
                      'Natural Finish'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Curator Conclusion */}
        <div className="mt-4 rounded-xl border border-[#6C5CE7]/30 bg-[#F0EDFD] p-3.5 text-xs text-[#1A1A18]">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6C5CE7]">
            <Sparkles size={12} />
            <span>AI Curator Conclusion</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-[#1A1A18]">
            {p1.category === p2.category
              ? `Both pieces offer remarkable architectural character. If you prioritize subtle tactile texture, ${p1.name} creates an intimate statement; whereas ${p2.name} offers distinct spatial presence.`
              : `Complementary pairing detected. ${p1.name} (${p1.category}) and ${p2.name} (${p2.category}) harmonize cleanly when placed together in a tranquil, contemporary residential setup.`}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-[#1A1A18] py-2.5 text-xs font-medium text-white hover:bg-[#242320] transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
