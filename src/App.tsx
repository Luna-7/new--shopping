/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { OmnilinkProvider, useOmnilink } from './context/OmnilinkContext';
import { Header } from './components/Header';
import { BottomBar } from './components/BottomBar';
import { FloatingCard } from './components/FloatingCard';
import { AiCartComparisonDialog } from './components/AiCartComparisonDialog';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { PersonalStudioScreen } from './screens/PersonalStudioScreen';
import { CartScreen } from './screens/CartScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { SceneViewerScreen } from './screens/SceneViewerScreen';
import { ExhibitionDetailScreen } from './screens/ExhibitionDetailScreen';
import { StoreScreen } from './screens/StoreScreen';
import { ReviewsScreen } from './screens/ReviewsScreen';
import { SearchScreen } from './screens/SearchScreen';

const OmnilinkAppInner: React.FC = () => {
  const {
    mainTab,
    selectedFloatingProduct,
    closeFloatingProduct,
    openProductDetail,
    currentProductDetail,
    closeProductDetail,
    currentScenePost,
    currentSceneIndex,
    scenePosts,
    closeScenePost,
    currentExhibition,
    closeExhibition,
    currentStoreName,
    closeStore,
    isSearchOpen,
    setSearchOpen,
    searchQuery,
    searchResults,
    updateSearchQuery,
    isReviewsOpen,
    closeReviews,
    cartComparisonPair,
    closeCartComparison,
    addToCart,
    openStore,
    openReviews,
    toastMessage,
  } = useOmnilink();

  const reviewTarget = currentProductDetail || null;

  return (
    <div className="min-h-screen w-full bg-[#FBF9F5] text-[#1A1A18] antialiased flex flex-col selection:bg-[#6C5CE7]/15">
      {/* Container with responsive scaling: naturally optimized for mobile, tablet, and desktop */}
      <div className="mx-auto w-full max-w-2xl min-h-screen flex flex-col bg-[#FBF9F5]">
        {/* Main App Header (Only on World/Home tab) */}
        {mainTab === 'WORLD' && <Header />}

        {/* Primary Tab View */}
        <main className="flex-1 w-full">
          {mainTab === 'WORLD' && <HomeScreen />}
          {mainTab === 'PERSONAL' && <PersonalStudioScreen />}
          {mainTab === 'CART' && <CartScreen />}
        </main>

        {/* Bottom Navigation Bar */}
        <BottomBar />
      </div>

      {/* Overlay: Floating Product Card (Bottom Sheet over Feed) */}
      {selectedFloatingProduct && (
        <FloatingCard
          product={selectedFloatingProduct}
          onDismiss={closeFloatingProduct}
          onExpandDetail={openProductDetail}
          onAddToCart={addToCart}
        />
      )}

      {/* Overlay: Full Product Detail Space */}
      {currentProductDetail && (
        <ProductDetailScreen
          product={currentProductDetail}
          onClose={closeProductDetail}
          onOpenStore={openStore}
          onOpenReviews={openReviews}
          onAddToCart={addToCart}
        />
      )}

      {/* Overlay: Full Screen Short Video / Scene Viewer */}
      {currentScenePost && (
        <SceneViewerScreen
          scenePosts={scenePosts}
          initialIndex={currentSceneIndex}
          onClose={closeScenePost}
          onOpenProductDetail={openProductDetail}
        />
      )}

      {/* Overlay: Digital Magazine Exhibition Detail */}
      {currentExhibition && (
        <ExhibitionDetailScreen
          exhibition={currentExhibition}
          onClose={closeExhibition}
          onProductClick={openProductDetail}
        />
      )}

      {/* Overlay: Store Digital Showroom */}
      {currentStoreName && (
        <StoreScreen
          storeName={currentStoreName}
          onClose={closeStore}
          onProductClick={openProductDetail}
        />
      )}

      {/* Overlay: Search Space */}
      {isSearchOpen && (
        <SearchScreen
          query={searchQuery}
          results={searchResults}
          onQueryChange={updateSearchQuery}
          onClose={() => setSearchOpen(false)}
          onProductClick={(p) => {
            setSearchOpen(false);
            openProductDetail(p);
          }}
        />
      )}

      {/* Overlay: Aggregated Theme Reviews Screen */}
      {isReviewsOpen && reviewTarget && (
        <ReviewsScreen
          reviews={reviewTarget.reviews}
          onClose={closeReviews}
        />
      )}

      {/* Overlay: AI Cart Comparison Dialog */}
      {cartComparisonPair && (
        <AiCartComparisonDialog
          pair={cartComparisonPair}
          onClose={closeCartComparison}
        />
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#1A1A18]/90 px-4 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <OmnilinkProvider>
      <OmnilinkAppInner />
    </OmnilinkProvider>
  );
}
