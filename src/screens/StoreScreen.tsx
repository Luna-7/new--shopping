import React from 'react';
import { ArrowLeft, Store } from 'lucide-react';
import { ProductItem } from '../types';
import { useOmnilink } from '../context/OmnilinkContext';

interface StoreScreenProps {
  storeName: string;
  onClose: () => void;
  onProductClick: (product: ProductItem) => void;
}

export const StoreScreen: React.FC<StoreScreenProps> = ({
  storeName,
  onClose,
  onProductClick,
}) => {
  const { products } = useOmnilink();
  const storeProducts = products.filter(
    (p) => p.storeName.toLowerCase() === storeName.toLowerCase()
  );
  const sampleProduct = storeProducts[0] || products[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FBF9F5] text-[#1A1A18] select-none pb-24 animate-in fade-in duration-200">
      {/* Brand Hero Banner */}
      <div className="relative h-72 w-full overflow-hidden bg-black">
        <img
          src={sampleProduct.mainImage}
          alt={storeName}
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#1A1A18] shadow-md backdrop-blur-md active:scale-95 transition-transform"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.25em] text-white/70">
            <Store size={12} />
            <span>Brand Showroom</span>
          </div>
          <h1 className="mt-1 font-editorial text-3xl sm:text-4xl font-normal text-white">
            {storeName}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6">
        {/* Brand Statement */}
        <div className="py-6 border-b border-[#E5E0D7]">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737069]">
            Studio Philosophy
          </h2>
          <p className="mt-2 font-editorial text-base sm:text-lg text-[#1A1A18] leading-relaxed">
            {sampleProduct.storeDescription ||
              'An independent studio devoted to timeless architectural forms, mindful materiality, and contemplative residential living.'}
          </p>
        </div>

        {/* Collection Objects */}
        <div className="py-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737069] mb-4">
            Collection Objects ({storeProducts.length})
          </h3>

          <div className="space-y-3">
            {storeProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-3 border border-[#E5E0D7] shadow-xs hover:border-[#1A1A18]/30 transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover bg-[#F4F1EA]"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1A18]">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#737069]">{product.category}</p>
                  </div>
                </div>

                <span className="text-sm font-bold text-[#1A1A18] pr-2">
                  {product.formattedPrice}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
