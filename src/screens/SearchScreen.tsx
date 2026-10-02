import React from 'react';
import { Search, X, Compass } from 'lucide-react';
import { ProductItem } from '../types';

interface SearchScreenProps {
  query: string;
  results: ProductItem[];
  onQueryChange: (query: string) => void;
  onClose: () => void;
  onProductClick: (product: ProductItem) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  query,
  results,
  onQueryChange,
  onClose,
  onProductClick,
}) => {
  const suggestedContexts = [
    'Bauhaus Interiors',
    'Bauhaus Workspace',
    'Modernist Objects',
    'Tactile Ceramics',
    'Architectural Lighting',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FBF9F5] text-[#1A1A18] select-none p-6 pt-safe pb-24 animate-in fade-in duration-200">
      <div className="mx-auto max-w-2xl">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737069]"
            />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search objects, stories, spaces..."
              className="w-full rounded-2xl border border-[#E5E0D7] bg-white py-3 pl-10 pr-10 text-sm text-[#1A1A18] placeholder-[#9E9A91] outline-hidden focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7] shadow-xs"
            />
            {query && (
              <button
                onClick={() => onQueryChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737069] hover:text-[#1A1A18]"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white border border-[#E5E0D7] text-[#1A1A18] hover:bg-[#F4F1EA] active:scale-95 transition-all shadow-xs"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Suggested Contexts */}
        <div className="mt-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737069]">
            Suggested Context
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedContexts.map((contextTag) => (
              <button
                key={contextTag}
                onClick={() => onQueryChange(contextTag.split(' ')[0])}
                className="rounded-full bg-white px-3.5 py-1.5 text-xs text-[#1A1A18] border border-[#E5E0D7] hover:border-[#6C5CE7] hover:text-[#6C5CE7] transition-all shadow-xs"
              >
                {contextTag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="mt-8">
          {!query.trim() ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-[#737069]">
              <Compass size={36} strokeWidth={1.5} className="text-[#9E9A91]" />
              <h4 className="mt-4 font-editorial text-2xl font-normal text-[#1A1A18]">
                Visual Exploration Space
              </h4>
              <p className="mt-1 text-xs text-[#737069] max-w-xs">
                Search by form, material, creator, or interior mood
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D7]">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737069]">
                  Visual Results ({results.length})
                </span>
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#737069]">
                  No matching studio objects found for "{query}".
                </div>
              ) : (
                <div className="mt-3 space-y-3">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => onProductClick(product)}
                      className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-3 border border-[#E5E0D7] shadow-xs hover:border-[#6C5CE7]/40 transition-all active:scale-[0.99]"
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
                          <p className="text-xs text-[#737069]">
                            {product.creator} • {product.category}
                          </p>
                        </div>
                      </div>

                      <span className="text-sm font-bold text-[#1A1A18] pr-2">
                        {product.formattedPrice}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
