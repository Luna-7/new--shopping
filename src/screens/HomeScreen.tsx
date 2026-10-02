import React from 'react';
import { Play, Sparkles, ShoppingBag } from 'lucide-react';
import { useOmnilink } from '../context/OmnilinkContext';
import { ProductItem, ScenePost, Exhibition } from '../types';

export const HomeScreen: React.FC = () => {
  const {
    exhibitions,
    feedItems,
    openExhibition,
    openFloatingProduct,
    openScenePost,
  } = useOmnilink();

  const leftColumn = feedItems.filter((_, idx) => idx % 2 === 0);
  const rightColumn = feedItems.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="min-h-screen bg-[#FBF9F5] pb-28">
      {/* Featured Exhibition Cards */}
      <section className="pt-2 pb-5">
        <div className="px-6 pb-2.5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#737069]">
            精选策展
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto px-6 pb-2 no-scrollbar snap-x snap-mandatory">
          {exhibitions.map((exhibition) => (
            <ExhibitionCard
              key={exhibition.id}
              exhibition={exhibition}
              onClick={() => openExhibition(exhibition)}
            />
          ))}
        </div>
      </section>

      {/* Main Masonry Feed */}
      <section className="px-6 pt-1 pb-4">
        <div className="flex items-baseline justify-between border-b border-[#E5E0D7] pb-2.5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#737069]">
            艺术选品瀑布流
          </h2>
        </div>

        {/* 2-Column Waterfall Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3.5 sm:gap-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftColumn.map((item, idx) =>
              item.type === 'product' ? (
                <FeedProductCard
                  key={`p-l-${item.product.id}-${idx}`}
                  product={item.product}
                  onClick={() => openFloatingProduct(item.product)}
                />
              ) : (
                <FeedSceneCard
                  key={`s-l-${item.scenePost.id}-${idx}`}
                  scenePost={item.scenePost}
                  onClick={() => openScenePost(item.scenePost)}
                />
              )
            )}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightColumn.map((item, idx) =>
              item.type === 'product' ? (
                <FeedProductCard
                  key={`p-r-${item.product.id}-${idx}`}
                  product={item.product}
                  onClick={() => openFloatingProduct(item.product)}
                />
              ) : (
                <FeedSceneCard
                  key={`s-r-${item.scenePost.id}-${idx}`}
                  scenePost={item.scenePost}
                  onClick={() => openScenePost(item.scenePost)}
                />
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const ExhibitionCard: React.FC<{
  exhibition: Exhibition;
  onClick: () => void;
}> = ({ exhibition, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative h-64 w-[80vw] max-w-[320px] shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl bg-[#1A1A18] shadow-md transition-all duration-300 hover:shadow-xl active:scale-[0.99]"
    >
      <img
        src={exhibition.coverImage}
        alt={exhibition.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <h3 className="font-editorial text-2xl font-normal leading-tight text-white">
          {exhibition.title}
        </h3>
        <p className="mt-1 text-xs text-white/80 line-clamp-1">
          {exhibition.subtitle}
        </p>
      </div>
    </div>
  );
};

/**
 * Standard Product Card:
 * Line 1: Title
 * Line 2: Price
 */
const FeedProductCard: React.FC<{
  product: ProductItem;
  onClick: () => void;
}> = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer select-none transition-transform duration-200 active:scale-[0.98]"
    >
      <div
        className="relative w-full overflow-hidden rounded-xl bg-[#F4F1EA] shadow-xs"
        style={{ aspectRatio: product.aspectRatio || 1.0 }}
      >
        <img
          src={product.mainImage}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
          loading="lazy"
        />
      </div>

      <div className="mt-2 px-0.5">
        <h4 className="truncate text-xs font-medium text-[#1A1A18] leading-tight">
          {product.name}
        </h4>
        <p className="mt-0.5 truncate text-xs font-bold text-[#1A1A18]">
          {product.formattedPrice}
        </p>
      </div>
    </div>
  );
};

/**
 * Scene Card:
 * No price displayed, editor avatar + editor name + title
 */
const FeedSceneCard: React.FC<{
  scenePost: ScenePost;
  onClick: () => void;
}> = ({ scenePost, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer select-none transition-transform duration-200 active:scale-[0.98]"
    >
      <div
        className="relative w-full overflow-hidden rounded-xl bg-[#F4F1EA] shadow-xs"
        style={{ aspectRatio: scenePost.aspectRatio || 0.85 }}
      >
        <img
          src={scenePost.coverImage}
          alt={scenePost.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
          loading="lazy"
        />

        <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white backdrop-blur-xs">
          {scenePost.isVideo ? (
            <Play size={10} className="fill-white" />
          ) : (
            <Sparkles size={10} />
          )}
          <span>{scenePost.isVideo ? '视频' : '场景'}</span>
        </div>

        {scenePost.linkedProducts.length > 0 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-black backdrop-blur-xs">
            <ShoppingBag size={10} />
            <span>{scenePost.linkedProducts.length}</span>
          </div>
        )}
      </div>

      <div className="mt-2 px-0.5">
        <div className="flex items-center gap-1.5">
          <img
            src={scenePost.editorAvatar}
            alt={scenePost.editorName}
            className="h-4 w-4 rounded-full object-cover border border-black/10"
          />
          <span className="truncate text-[11px] font-medium text-[#737069]">
            {scenePost.editorName}
          </span>
        </div>

        <h4 className="mt-1 line-clamp-2 text-xs font-semibold text-[#1A1A18] leading-snug">
          {scenePost.title}
        </h4>
      </div>
    </div>
  );
};
