import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  ShoppingBag,
  Zap,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ScenePost, ProductItem } from '../types';
import { useOmnilink } from '../context/OmnilinkContext';

interface SceneViewerScreenProps {
  scenePosts: ScenePost[];
  initialIndex: number;
  onClose: () => void;
  onOpenProductDetail: (product: ProductItem) => void;
}

export const SceneViewerScreen: React.FC<SceneViewerScreenProps> = ({
  scenePosts,
  initialIndex,
  onClose,
  onOpenProductDetail,
}) => {
  const { addToCart, showToast } = useOmnilink();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  const scene = scenePosts[currentIndex] || scenePosts[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % scenePosts.length);
    setSelectedProductIds([]);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + scenePosts.length) % scenePosts.length);
    setSelectedProductIds([]);
  };

  const toggleProductSelect = (id: string) => {
    setSelectedProductIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((i) => i !== id) : [...prev, id];
      if (updated.length > 0) {
        setIsMultiSelectMode(true);
      }
      return updated;
    });
  };

  const selectAllProducts = () => {
    if (selectedProductIds.length === scene.linkedProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(scene.linkedProducts.map((p) => p.id));
      setIsMultiSelectMode(true);
    }
  };

  const activeSelections = scene.linkedProducts.filter((p) =>
    selectedProductIds.includes(p.id)
  );

  const totalPrice = activeSelections.reduce((sum, item) => sum + item.price, 0);

  const handleBatchAddToCart = () => {
    if (activeSelections.length === 0) return;
    activeSelections.forEach((p) => addToCart(p));
    showToast(`Added ${activeSelections.length} objects to selection!`);
    setSelectedProductIds([]);
  };

  const handleBatchBuyNow = () => {
    if (activeSelections.length === 0) return;
    activeSelections.forEach((p) => addToCart(p));
    showToast(`⚡ 一键购买成功: ${activeSelections.length} 件艺术好物已锁定 ($${totalPrice.toFixed(0)})!`);
    setSelectedProductIds([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-white select-none animate-in fade-in duration-200">
      {/* Top Floating Control Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 pt-safe bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-md hover:bg-black/60 active:scale-95 transition-all"
          aria-label="Close viewer"
        >
          <X size={18} />
        </button>

        {/* Scene index indicator & Up/Down navigation */}
        <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs backdrop-blur-md text-white/80">
          <button
            onClick={handlePrev}
            className="p-0.5 hover:text-white transition-colors"
            title="Previous scene"
          >
            <ChevronUp size={14} />
          </button>
          <span className="font-mono text-[11px]">
            {currentIndex + 1} / {scenePosts.length}
          </span>
          <button
            onClick={handleNext}
            className="p-0.5 hover:text-white transition-colors"
            title="Next scene"
          >
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Main Full-screen Media Background */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
        <img
          src={scene.coverImage}
          alt={scene.title}
          className="h-full w-full object-cover"
        />

        {/* Overlay Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

        {/* Video Play/Pause Touch Area */}
        {scene.isVideo && (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-20 flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 active:scale-90 transition-transform"
          >
            {isPlaying ? (
              <Pause size={24} className="fill-white" />
            ) : (
              <Play size={24} className="fill-white ml-0.5" />
            )}
          </button>
        )}
      </div>

      {/* Bottom Scene Content & Linked Objects Area */}
      <div className="relative z-20 w-full bg-gradient-to-t from-black via-black/90 to-transparent p-5 pb-safe">
        {/* Editor Info & Title */}
        <div className="flex items-center gap-2.5 mb-2">
          <img
            src={scene.editorAvatar}
            alt={scene.editorName}
            className="h-8 w-8 rounded-full border border-white/30 object-cover"
          />
          <div>
            <span className="text-xs font-medium text-white/90">
              {scene.editorName}
            </span>
            <div className="text-[10px] text-white/60">Spatial Curator</div>
          </div>
        </div>

        <h3 className="font-editorial text-xl font-normal text-white leading-snug">
          {scene.title}
        </h3>
        <p className="mt-1 text-xs text-white/70 line-clamp-2 leading-relaxed">
          {scene.description}
        </p>

        {/* Linked Shoppable Objects Shelf */}
        {scene.linkedProducts.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-white/15">
            <div className="flex items-center justify-between pb-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-white/60">
                Linked Objects ({scene.linkedProducts.length})
              </span>
              <button
                onClick={selectAllProducts}
                className="text-[11px] text-[#6C5CE7] font-medium hover:underline"
              >
                {selectedProductIds.length === scene.linkedProducts.length
                  ? '取消全选'
                  : '长按多选 / 全选'}
              </button>
            </div>

            {/* Horizontal Linked Products Scroll */}
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {scene.linkedProducts.map((prod) => {
                const isSelected = selectedProductIds.includes(prod.id);
                return (
                  <div
                    key={prod.id}
                    onClick={() => {
                      if (isMultiSelectMode) {
                        toggleProductSelect(prod.id);
                      } else {
                        onOpenProductDetail(prod);
                      }
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setIsMultiSelectMode(true);
                      toggleProductSelect(prod.id);
                    }}
                    className={`relative flex items-center gap-2.5 rounded-xl p-2 min-w-[210px] max-w-[240px] shrink-0 border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/20 border-[#6C5CE7] ring-1 ring-[#6C5CE7]'
                        : 'bg-white/10 border-white/15 hover:bg-white/15'
                    }`}
                  >
                    {/* Checkbox for selection */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMultiSelectMode(true);
                        toggleProductSelect(prod.id);
                      }}
                      className="text-white hover:text-[#6C5CE7] p-0.5"
                      title="Select product"
                    >
                      {isSelected ? (
                        <CheckCircle2 size={16} className="text-[#6C5CE7] fill-white" />
                      ) : (
                        <Circle size={16} className="text-white/40" />
                      )}
                    </button>

                    <img
                      src={prod.mainImage}
                      alt={prod.name}
                      className="h-11 w-11 rounded-lg object-cover bg-neutral-800"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="truncate text-xs font-medium text-white">
                        {prod.name}
                      </div>
                      <div className="text-[11px] font-bold text-[#6C5CE7]">
                        {prod.formattedPrice}
                      </div>
                    </div>

                    {/* Quick Add icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(prod);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white active:scale-95 transition-all"
                      title="Add to Selection"
                    >
                      <ShoppingBag size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PROMINENT BOTTOM BAR FOR MULTI-SELECTION (一键加入购物车 / 一键购买) */}
        {/* REQUIREMENT: "长按多选同时下方出现一键加入购物车/一键购买（此图标更加明显）" */}
        {(selectedProductIds.length > 0 || isMultiSelectMode) && (
          <div className="mt-3 rounded-2xl bg-white p-3.5 text-[#1A1A18] shadow-2xl border border-white/20 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 text-xs">
              <span className="font-medium text-[#737069]">
                已选{' '}
                <strong className="text-[#1A1A18]">
                  {activeSelections.length}
                </strong>{' '}
                件艺术单品
              </span>
              <span className="text-sm font-bold text-[#1A1A18]">
                合计: ${totalPrice.toFixed(0)}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {/* Button 1: One-Click Add to Cart (一键加入购物车) */}
              <button
                onClick={handleBatchAddToCart}
                disabled={activeSelections.length === 0}
                className="flex-1 flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#1A1A18] bg-white text-xs font-semibold text-[#1A1A18] hover:bg-[#F4F1EA] disabled:opacity-40 active:scale-98 transition-all"
              >
                <ShoppingBag size={14} />
                <span>一键加入购物车</span>
              </button>

              {/* Button 2: One-Click Buy Now (一键购买) -> MUCH MORE PROMINENT ("此图标更加明显") */}
              <button
                onClick={handleBatchBuyNow}
                disabled={activeSelections.length === 0}
                className="flex-[1.3] flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-xs font-bold text-white shadow-lg hover:brightness-105 active:scale-98 disabled:opacity-40 transition-all"
              >
                <Zap size={16} className="fill-white animate-pulse" />
                <span className="tracking-wide">一键购买 (${totalPrice.toFixed(0)})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
