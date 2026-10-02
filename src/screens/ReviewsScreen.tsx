import React, { useState } from 'react';
import { ArrowLeft, Star, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface ReviewsScreenProps {
  reviews: Review[];
  onClose: () => void;
}

export const ReviewsScreen: React.FC<ReviewsScreenProps> = ({
  reviews,
  onClose,
}) => {
  const categories = [
    'All',
    'Quality',
    'Size',
    'Comfort',
    'Durability',
    'Shipping',
  ];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredReviews =
    selectedCategory === 'All'
      ? reviews
      : reviews.filter(
          (r) => r.categoryTag.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FBF9F5] text-[#1A1A18] select-none pb-20 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E5E0D7] bg-[#FBF9F5]/90 px-6 py-3.5 backdrop-blur-md pt-safe">
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1A1A18] border border-[#E5E0D7] shadow-xs active:scale-95 transition-transform"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-editorial text-xl font-normal text-[#1A1A18]">
          User Impressions & Reviews
        </h1>
        <div className="w-9" />
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-4">
        {/* Aggregated Themes Filter */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737069] mb-3">
          <Sparkles size={13} className="text-[#6C5CE7]" />
          <span>Aggregated Themes</span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#1A1A18] text-white shadow-xs'
                    : 'bg-white text-[#737069] border border-[#E5E0D7] hover:border-[#1A1A18]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Reviews List */}
        <div className="mt-6 space-y-3.5">
          {filteredReviews.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#737069]">
              No reviews in this category yet.
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl bg-white p-4 border border-[#E5E0D7] shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs text-[#1A1A18]">
                    {review.author}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={13} fill="currentColor" />
                    <span className="text-xs font-bold text-[#1A1A18]">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-xs text-[#1A1A18] leading-relaxed">
                  {review.text}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-[#F4F1EA] pt-2 text-[10px] text-[#737069]">
                  <span className="rounded bg-[#F4F1EA] px-2 py-0.5 font-medium text-[#6C5CE7]">
                    Theme: {review.categoryTag}
                  </span>
                  <span>{review.createdAt || 'Verified Purchase'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
