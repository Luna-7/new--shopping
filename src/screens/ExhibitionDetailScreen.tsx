import React from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Exhibition, ProductItem } from '../types';

interface ExhibitionDetailScreenProps {
  exhibition: Exhibition;
  onClose: () => void;
  onProductClick: (product: ProductItem) => void;
}

export const ExhibitionDetailScreen: React.FC<ExhibitionDetailScreenProps> = ({
  exhibition,
  onClose,
  onProductClick,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FBF9F5] text-[#1A1A18] select-none pb-24 animate-in fade-in duration-200">
      {/* Editorial Hero Header */}
      <div className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-black">
        <img
          src={exhibition.coverImage}
          alt={exhibition.title}
          className="h-full w-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

        {/* Floating Back Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#1A1A18] shadow-md backdrop-blur-md active:scale-95 transition-transform"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Hero Title & Subtitle */}
        <div className="absolute bottom-8 left-0 right-0 px-6 text-white max-w-2xl mx-auto">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/70">
            Digital Exhibition
          </span>
          <h1 className="mt-2 font-editorial text-4xl sm:text-5xl font-normal leading-tight text-white">
            {exhibition.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/85 leading-relaxed">
            {exhibition.subtitle}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6">
        {/* Curator Overview Statement */}
        <div className="py-8 border-b border-[#E5E0D7]">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737069]">
            Curator Statement
          </h2>
          <p className="mt-3 font-editorial text-lg sm:text-xl text-[#1A1A18] leading-relaxed italic">
            "{exhibition.description}"
          </p>
        </div>

        {/* Chapters Flow */}
        <div className="divide-y divide-[#E5E0D7]">
          {exhibition.chapters.map((chapter, idx) => (
            <div key={idx} className="py-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6C5CE7]">
                {chapter.chapterNumber}
              </span>
              <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-normal text-[#1A1A18]">
                {chapter.title}
              </h3>

              {/* Chapter Image with Shoppable Hotspot Badges */}
              <div className="relative mt-5 aspect-16/10 w-full overflow-hidden rounded-2xl bg-[#F4F1EA] shadow-md">
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  className="h-full w-full object-cover"
                />

                {/* Hotspot Badges */}
                <div className="absolute bottom-3 right-3 flex flex-wrap gap-2 justify-end">
                  {chapter.taggedProducts.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => onProductClick(prod)}
                      className="flex items-center gap-1.5 rounded-full bg-[#FBF9F5]/95 px-3 py-1.5 text-xs font-medium text-[#1A1A18] shadow-md backdrop-blur-md hover:bg-white active:scale-95 transition-all border border-[#E5E0D7]"
                    >
                      <ShoppingBag size={13} className="text-[#6C5CE7]" />
                      <span>{prod.name}</span>
                      <span className="text-[#737069] font-normal">
                        • {prod.formattedPrice}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chapter text */}
              <p className="mt-5 text-sm sm:text-base text-[#1A1A18] leading-relaxed">
                {chapter.contentText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
