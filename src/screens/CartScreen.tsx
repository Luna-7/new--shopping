import React from 'react';
import { Minus, Plus, Sparkles, Trash2, ShoppingBag } from 'lucide-react';
import { useOmnilink } from '../context/OmnilinkContext';

export const CartScreen: React.FC = () => {
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    openProductDetail,
    startCartComparison,
    showToast,
    clearCart,
  } = useOmnilink();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 0 : 0; // Climate-neutral complimentary studio shipping
  const total = subtotal + shipping;

  const handleCheckout = () => {
    showToast(`Order initiated! Total: $${total.toFixed(0)}. Proceeding to secure gateway...`);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1A1A18] pb-32 pt-2 select-none">
      <div className="mx-auto max-w-2xl px-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D7]">
          <div>
            <h1 className="font-editorial text-3xl font-normal text-[#1A1A18]">
              Selection
            </h1>
            <p className="text-xs text-[#737069]">
              {cartItems.length} distinct studio objects reserved
            </p>
          </div>

          {cartItems.length >= 2 && (
            <button
              onClick={() =>
                startCartComparison(cartItems[0].product, cartItems[1].product)
              }
              className="flex items-center gap-1.5 rounded-full border border-[#6C5CE7]/30 bg-[#F0EDFD] px-3.5 py-1.5 text-xs font-medium text-[#6C5CE7] hover:bg-[#6C5CE7]/15 active:scale-95 transition-all shadow-xs"
            >
              <Sparkles size={13} />
              <span>AI Compare Pair</span>
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center text-[#737069]">
            <ShoppingBag size={40} strokeWidth={1.5} className="text-[#9E9A91]" />
            <h3 className="mt-4 font-editorial text-2xl text-[#1A1A18]">
              Your selection is currently empty.
            </h3>
            <p className="mt-1 text-xs text-[#737069] max-w-xs">
              Explore the curated exhibitions or discover objects in the masonry feed.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {/* Items list */}
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between rounded-2xl bg-white p-4 border border-[#E5E0D7] shadow-xs"
              >
                <div
                  onClick={() => openProductDetail(item.product)}
                  className="flex cursor-pointer items-center gap-3.5 flex-1 min-w-0"
                >
                  <img
                    src={item.product.mainImage}
                    alt={item.product.name}
                    className="h-16 w-16 rounded-xl object-cover bg-[#F4F1EA] shrink-0"
                  />
                  <div className="min-w-0 pr-2">
                    <h4 className="truncate text-sm font-medium text-[#1A1A18]">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-[#737069]">
                      Variant: {item.variant}
                    </p>
                    <span className="text-xs font-semibold text-[#1A1A18]">
                      {item.product.formattedPrice}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-full bg-[#F4F1EA] p-1 border border-[#E5E0D7]">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, -1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1A1A18] hover:bg-[#EBE7DF] shadow-xs active:scale-90 transition-all"
                      aria-label="Decrease"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-7 text-center text-xs font-semibold text-[#1A1A18]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1A1A18] hover:bg-[#EBE7DF] shadow-xs active:scale-90 transition-all"
                      aria-label="Increase"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-[#9E9A91] hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}

            {/* Summary & Checkout Card */}
            <div className="mt-8 rounded-2xl bg-white p-5 border border-[#E5E0D7] shadow-xs">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#737069]">
                  <span>Subtotal</span>
                  <span className="text-[#1A1A18] font-medium">
                    ${subtotal.toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between text-[#737069]">
                  <span>Climate-Neutral White-Glove Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-[#737069]">
                  <span>Studio Carbon Offset</span>
                  <span className="text-emerald-600 font-medium">Included</span>
                </div>

                <div className="border-t border-[#E5E0D7] pt-3 flex justify-between items-baseline">
                  <span className="font-editorial text-lg font-normal text-[#1A1A18]">
                    Total Acquisition
                  </span>
                  <span className="font-editorial text-2xl font-bold text-[#1A1A18]">
                    ${total.toFixed(0)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-5 w-full flex h-12 items-center justify-center rounded-xl bg-[#1A1A18] text-xs font-semibold text-white shadow-md hover:bg-[#242320] active:scale-98 transition-all"
              >
                Proceed to Checkout
              </button>

              <p className="mt-2.5 text-center text-[10px] text-[#9E9A91]">
                Safe acquisition protected by Studio Authenticity Guarantee & 14-day archival return policy.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
