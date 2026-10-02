import React, { useState } from 'react';
import {
  ArrowLeft,
  Store,
  Star,
  Send,
  Sparkles,
  ShoppingBag,
  Share2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { ProductItem } from '../types';
import { useOmnilink } from '../context/OmnilinkContext';

interface ProductDetailScreenProps {
  product: ProductItem;
  onClose: () => void;
  onOpenStore: (storeName: string) => void;
  onOpenReviews: () => void;
  onAddToCart: (product: ProductItem) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onClose,
  onOpenStore,
  onOpenReviews,
  onAddToCart,
}) => {
  const { qnaHistory, askProductQna, showToast, savedProductIds, toggleSaveProduct } =
    useOmnilink();
  const [qnaInput, setQnaInput] = useState('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const images = [product.mainImage, ...product.secondaryImages];
  const qnaList = qnaHistory[product.id] || [];
  const isSaved = savedProductIds.includes(product.id);

  const handleSendQna = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!qnaInput.trim()) return;
    askProductQna(product.id, qnaInput.trim());
    setQnaInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FBF9F5] text-[#1A1A18] select-none pb-28 animate-in fade-in duration-200">
      {/* Top Floating Action Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-[#FBF9F5]/85 backdrop-blur-md border-b border-[#E5E0D7]/50 pt-safe">
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1A1A18] shadow-xs border border-[#E5E0D7] active:scale-95 transition-transform"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSaveProduct(product.id)}
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-xs border border-[#E5E0D7] active:scale-95 transition-all ${
              isSaved ? 'text-amber-500' : 'text-[#737069]'
            }`}
            title="Save to My World"
          >
            <Star size={16} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: product.name,
                  text: product.shortDescription,
                  url: window.location.href,
                }).catch(() => {});
              } else {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Product link copied to clipboard');
              }
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#737069] shadow-xs border border-[#E5E0D7] active:scale-95 transition-transform"
            title="Share"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 pt-3">
        {/* Media Gallery Header */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-[#F4F1EA] shadow-md">
          <img
            src={images[activeImageIdx % images.length]}
            alt={product.name}
            className="h-full w-full object-cover transition-opacity duration-300"
          />

          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeImageIdx
                      ? 'w-5 bg-white'
                      : 'w-1.5 bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Identity */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs text-[#737069]">
            <span className="rounded-md bg-[#F4F1EA] px-2 py-0.5 font-medium text-[#1A1A18]">
              {product.category}
            </span>
            <span>•</span>
            <span>Studio Object</span>
          </div>

          <div className="mt-2 flex items-baseline justify-between gap-4">
            <h1 className="font-editorial text-3xl font-normal leading-tight text-[#1A1A18]">
              {product.name}
            </h1>
            <span className="text-2xl font-bold text-[#1A1A18]">
              {product.formattedPrice}
            </span>
          </div>

          <p className="mt-1 text-sm text-[#737069]">
            Conceived by{' '}
            <span className="font-medium text-[#1A1A18]">
              {product.creator}
            </span>
          </p>
        </div>

        {/* AI Summary Capsule */}
        <div className="mt-4 rounded-xl border border-[#6C5CE7]/30 bg-[#F0EDFD] p-3.5 text-xs text-[#1A1A18] leading-relaxed">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6C5CE7]">
            <Sparkles size={13} />
            <span>AI Studio Insight</span>
          </div>
          <p className="mt-1 text-xs text-[#1A1A18]">{product.aiSummary}</p>
        </div>

        {/* Store Brand Showroom Entrance */}
        <div
          onClick={() => onOpenStore(product.storeName)}
          className="mt-6 flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 border border-[#E5E0D7] shadow-xs hover:border-[#1A1A18]/30 transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F1EA] text-[#1A1A18]">
              <Store size={18} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#1A1A18]">
                {product.storeName}
              </h4>
              <p className="text-[11px] text-[#737069]">
                View Studio Collection & Archive
              </p>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#9E9A91]" />
        </div>

        {/* Technical Specifications */}
        <div className="mt-8">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737069]">
            Object Specifications
          </h3>
          <div className="mt-3 divide-y divide-[#E5E0D7] rounded-xl border border-[#E5E0D7] bg-white">
            {Object.entries(product.specs).map(([key, val]) => (
              <div
                key={key}
                className="flex items-baseline justify-between px-4 py-3 text-xs"
              >
                <span className="text-[#737069]">{key}</span>
                <span className="font-medium text-[#1A1A18] text-right ml-4">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* User Reviews Entrance & Theme Summary */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737069]">
              User Impressions & Reviews
            </h3>
            <button
              onClick={onOpenReviews}
              className="text-xs font-medium text-[#6C5CE7] hover:underline"
            >
              View all 128 reviews →
            </button>
          </div>

          <div
            onClick={onOpenReviews}
            className="mt-3 cursor-pointer rounded-xl bg-white p-4 border border-[#E5E0D7] shadow-xs hover:border-[#6C5CE7]/40 transition-all"
          >
            <div className="flex items-center gap-1.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
              <span className="ml-1 text-xs font-bold text-[#1A1A18]">
                4.9 / 5.0
              </span>
            </div>
            <p className="mt-2 text-xs text-[#1A1A18] leading-relaxed">
              "Most buyers praise the build quality and warm light atmosphere. A few mention that the base has a substantial, heavy feel."
            </p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-[#737069]">
              <Sparkles size={11} className="text-[#6C5CE7]" />
              <span>Aggregated by AI • Quality, Size, Shipping</span>
            </div>
          </div>
        </div>

        {/* Design Context Story */}
        {product.contextStory && (
          <div className="mt-8 rounded-2xl bg-[#F4F1EA]/80 p-5 border border-[#E5E0D7]">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737069]">
              Design Context
            </h3>
            <p className="mt-2 font-editorial text-base text-[#1A1A18] leading-relaxed italic">
              "{product.contextStory}"
            </p>
          </div>
        )}

        {/* Interactive Object Inquiry (Q&A) */}
        <div className="mt-8">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-[#6C5CE7]" />
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737069]">
              Object Inquiry (Q&A)
            </h3>
          </div>
          <p className="mt-1 text-[11px] text-[#737069]">
            Ask questions regarding dimensions, ergonomics, materials, or shipping.
          </p>

          {/* Q&A Messages List */}
          <div className="mt-3 space-y-3">
            {qnaList.map((item) => (
              <div
                key={item.id}
                className={`rounded-xl p-3 text-xs leading-relaxed ${
                  item.isUser
                    ? 'ml-6 bg-[#EBE7DF]/80 text-[#1A1A18]'
                    : 'mr-6 bg-white border border-[#E5E0D7] text-[#1A1A18] shadow-xs'
                }`}
              >
                <div className="font-medium">
                  {item.isUser ? 'Q: ' : 'A: '}
                  {item.text}
                </div>
                {item.evidenceText && (
                  <div className="mt-1.5 text-[10px] text-[#6C5CE7] font-medium border-t border-[#F4F1EA] pt-1">
                    {item.evidenceText}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Ask Input Form */}
          <form onSubmit={handleSendQna} className="mt-3 flex gap-2">
            <input
              type="text"
              value={qnaInput}
              onChange={(e) => setQnaInput(e.target.value)}
              placeholder="Ask about materials, dimensions, light..."
              className="flex-1 rounded-xl border border-[#E5E0D7] bg-white px-3.5 py-2 text-xs text-[#1A1A18] placeholder-[#9E9A91] outline-hidden focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7]"
            />
            <button
              type="submit"
              disabled={!qnaInput.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6C5CE7] text-white disabled:opacity-40 transition-opacity"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Fixed Bottom Acquisition Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#E5E0D7] bg-[#FBF9F5]/95 px-6 py-3 backdrop-blur-md pb-safe">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#1A1A18] bg-transparent text-xs font-semibold text-[#1A1A18] hover:bg-[#F4F1EA] active:scale-98 transition-all"
          >
            <ShoppingBag size={14} />
            <span>Add to Selection</span>
          </button>
          <button
            onClick={() => {
              onAddToCart(product);
              showToast(`⚡ Order reserved for ${product.name}`);
            }}
            className="flex-1 flex h-11 items-center justify-center rounded-xl bg-[#1A1A18] text-xs font-semibold text-white hover:bg-[#242320] active:scale-98 transition-all shadow-md"
          >
            <span>Acquire {product.formattedPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
