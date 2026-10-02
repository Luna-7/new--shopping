import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  User,
  Image as ImageIcon,
  Trash2,
  Repeat,
  ShoppingBag,
  Zap,
  ArrowRight,
  X,
  Bot,
  Shuffle,
  Dice5,
} from 'lucide-react';
import { useOmnilink } from '../context/OmnilinkContext';
import { ProductItem } from '../types';

export const PersonalStudioScreen: React.FC = () => {
  const {
    personalSubTab,
    setPersonalSubTab,
    aiMessages,
    isAiThinking,
    sendAiMessage,
    sendAiImageMessage,
    deleteMatchedItem,
    replaceMatchedItem,
    openProductDetail,
    addToCart,
    addMultipleToCart,
    savedProductIds,
    products,
    showToast,
  } = useOmnilink();

  const [inputVal, setInputVal] = useState('');
  const [replacingTarget, setReplacingTarget] = useState<{
    messageId: string;
    product: ProductItem;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages, isAiThinking]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;
    sendAiMessage(inputVal.trim());
    setInputVal('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        sendAiImageMessage(result, inputVal.trim() || undefined);
        setInputVal('');
      };
      reader.readAsDataURL(file);
    }
  };

  // Instant Random Swap Function
  const handleRandomSwap = (messageId: string, currentProductId: string) => {
    const candidates = products.filter((p) => p.id !== currentProductId);
    if (candidates.length === 0) return;
    const randomPick = candidates[Math.floor(Math.random() * candidates.length)];
    replaceMatchedItem(messageId, currentProductId, randomPick);
  };

  const samplePhotoPresets = [
    { label: '🏛️ 包豪斯日光工作室', src: '/assets/img_render_bauhaus.jpg', text: '请识别这间包豪斯极简工作室的风格并找同款家具与台灯' },
    { label: '🍵 侘寂陶艺阅读角', src: '/assets/img_render_wabisabi.jpg', text: '请识别这间侘寂风陶艺阅读角落并找同款单品' },
    { label: '🧥 画廊极简亚麻工装', src: '/assets/img_render_outfit.jpg', text: '请识别这套画廊极简亚麻工装造型并找同款' },
    { label: '🌿 日光绿植有机客厅', src: '/assets/img_render_living.jpg', text: '请识别这个阳光绿植客厅的搭配风格并找同款' },
  ];

  const savedProducts = products.filter((p) =>
    savedProductIds.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1A1A18] pb-32 pt-2 select-none flex flex-col justify-between">
      {/* Top Header Switcher (AI Studio <-> ME Archive) */}
      <div className="flex justify-center px-6 py-2 sticky top-0 z-10 bg-[#FBF9F5]/90 backdrop-blur-md">
        <div className="inline-flex rounded-full bg-[#EBE7DF]/80 p-1 border border-[#E5E0D7]">
          <button
            onClick={() => setPersonalSubTab('AI')}
            className={`flex items-center gap-1.5 rounded-full px-5 py-1.5 text-xs font-medium transition-all ${
              personalSubTab === 'AI'
                ? 'bg-white text-[#1A1A18] shadow-xs'
                : 'text-[#737069] hover:text-[#1A1A18]'
            }`}
          >
            <Sparkles
              size={13}
              className={
                personalSubTab === 'AI' ? 'text-[#6C5CE7]' : 'text-current'
              }
            />
            <span>AI Studio</span>
          </button>
          <button
            onClick={() => setPersonalSubTab('ME')}
            className={`flex items-center gap-1.5 rounded-full px-5 py-1.5 text-xs font-medium transition-all ${
              personalSubTab === 'ME'
                ? 'bg-white text-[#1A1A18] shadow-xs'
                : 'text-[#737069] hover:text-[#1A1A18]'
            }`}
          >
            <User size={13} />
            <span>ME Archive</span>
          </button>
        </div>
      </div>

      {personalSubTab === 'AI' ? (
        /* Real Left-Right Conversational Dialogue Mode (左右对话流) */
        <div className="mx-auto w-full max-w-2xl px-3.5 sm:px-6 pt-2 flex-1 flex flex-col">
          {/* Quick preset chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
            <span className="text-xs text-[#737069] shrink-0">快捷试用:</span>
            {samplePhotoPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => sendAiImageMessage(preset.src, preset.text)}
                className="shrink-0 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#1A1A18] border border-[#E5E0D7] hover:border-[#6C5CE7] transition-all shadow-xs"
              >
                <img
                  src={preset.src}
                  alt={preset.label}
                  className="h-4 w-4 rounded-full object-cover"
                />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>

          {/* Left-Right Conversation Stream */}
          <div className="space-y-6 pb-28 pt-2">
            {aiMessages.map((msg) => (
              <div key={msg.id} className="w-full">
                {msg.isUser ? (
                  /* User Message: Aligned to the RIGHT with User Avatar */
                  <div className="flex items-start justify-end gap-2.5 pl-10">
                    <div className="flex flex-col items-end max-w-[85%] space-y-1">
                      <div className="flex items-center gap-1 text-[11px] text-[#737069] pr-1">
                        <span>我</span>
                      </div>

                      <div className="rounded-2xl rounded-tr-xs bg-[#1A1A18] text-white p-3.5 text-xs shadow-xs space-y-2">
                        {msg.image && (
                          <img
                            src={msg.image}
                            alt="User uploaded reference"
                            className="max-h-60 w-full rounded-xl object-cover"
                          />
                        )}
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>

                    <img
                      src="/assets/img_creator_alex.jpg"
                      alt="User"
                      className="h-8 w-8 rounded-full object-cover border border-[#E5E0D7] shrink-0 mt-4"
                    />
                  </div>
                ) : (
                  /* AI Message: Aligned to the LEFT with AI Studio Avatar */
                  <div className="flex items-start gap-2.5 pr-2 sm:pr-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#6C5CE7] to-[#8E44AD] text-white shadow-xs shrink-0 mt-4">
                      <Bot size={16} />
                    </div>

                    <div className="flex flex-col items-start flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-1 text-[11px] text-[#737069] pl-1 font-medium">
                        <span>AI 空间策展人</span>
                      </div>

                      {/* AI Conversational Text Bubble */}
                      <div className="max-w-[420px] rounded-2xl rounded-tl-xs bg-white p-3.5 border border-[#E5E0D7] text-xs leading-relaxed shadow-xs space-y-1.5">
                        {msg.styleTag && (
                          <div className="inline-flex items-center gap-1 rounded-md bg-[#F0EDFD] px-2 py-0.5 text-[11px] font-semibold text-[#6C5CE7]">
                            <Sparkles size={11} />
                            <span>风格识别：{msg.styleTag}</span>
                          </div>
                        )}
                        <p className="text-[#1A1A18]">{msg.text}</p>
                      </div>

                      {/* Vertically Listed Matched Products: Sleek, Narrow, Minimalist */}
                      {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                        <div className="w-full max-w-[360px] sm:max-w-[390px] space-y-2 pt-0.5">
                          {msg.matchedProducts.map((product) => (
                            <div
                              key={product.id}
                              className="group flex items-center justify-between rounded-xl bg-white p-2.5 border border-[#E5E0D7] shadow-2xs hover:border-[#6C5CE7]/40 transition-all"
                            >
                              {/* Product Thumbnail & Minimal Title/Price */}
                              <div
                                onClick={() => openProductDetail(product)}
                                className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer pr-1"
                              >
                                <img
                                  src={product.mainImage}
                                  alt={product.name}
                                  className="h-11 w-11 rounded-lg object-cover bg-[#F4F1EA] shrink-0 border border-[#E5E0D7]/50"
                                />
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-[11px] font-medium text-[#1A1A18] truncate leading-tight">
                                    {product.name}
                                  </h4>
                                  <div className="text-[11px] font-bold text-[#1A1A18] mt-0.5">
                                    {product.formattedPrice}
                                  </div>
                                </div>
                              </div>

                              {/* Minimal Actions: 🎲 随机换, 替换, 删, 加购 */}
                              <div className="flex items-center gap-1 shrink-0">
                                {/* Direct Random Shuffle Button */}
                                <button
                                  onClick={() => handleRandomSwap(msg.id, product.id)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F4F1EA] text-[#737069] hover:text-[#6C5CE7] hover:bg-[#F0EDFD] active:scale-90 transition-all"
                                  title="随机换一件同类单品"
                                >
                                  <Shuffle size={12} />
                                </button>

                                {/* Select Replacement Modal Button */}
                                <button
                                  onClick={() =>
                                    setReplacingTarget({
                                      messageId: msg.id,
                                      product,
                                    })
                                  }
                                  className="flex h-7 items-center gap-0.5 rounded-lg bg-[#F4F1EA] px-2 text-[10px] font-medium text-[#1A1A18] hover:bg-[#EBE7DF] active:scale-95 transition-all"
                                  title="选择替换单品"
                                >
                                  <Repeat size={11} className="text-[#6C5CE7]" />
                                  <span>替换</span>
                                </button>

                                {/* Delete Item Button */}
                                <button
                                  onClick={() =>
                                    deleteMatchedItem(msg.id, product.id)
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F4F1EA] text-[#737069] hover:text-red-500 hover:bg-red-50 active:scale-90 transition-all"
                                  title="删除此单品"
                                >
                                  <Trash2 size={11} />
                                </button>

                                {/* Add to Cart Button */}
                                <button
                                  onClick={() => addToCart(product)}
                                  className="flex h-7 items-center gap-1 rounded-lg bg-[#1A1A18] px-2.5 text-[10px] font-semibold text-white shadow-2xs hover:bg-[#242320] active:scale-95 transition-all"
                                >
                                  <ShoppingBag size={11} />
                                  <span>加购</span>
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* Minimalist Batch Action Bar */}
                          <div className="flex items-center justify-between rounded-xl bg-[#F0EDFD]/80 px-3 py-2 border border-[#6C5CE7]/30 text-xs">
                            <span className="font-semibold text-[#1A1A18] text-[11px]">
                              已选 {msg.matchedProducts.length} 件 ($
                              {msg.matchedProducts
                                .reduce((sum, p) => sum + p.price, 0)
                                .toFixed(0)}
                              )
                            </span>
                            <button
                              onClick={() =>
                                addMultipleToCart(msg.matchedProducts || [])
                              }
                              className="flex h-7 items-center gap-1 rounded-lg bg-[#6C5CE7] px-2.5 text-[11px] font-bold text-white shadow-2xs hover:brightness-105 active:scale-95 transition-all"
                            >
                              <Zap size={11} className="fill-white" />
                              <span>一键全加购</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Indicator on the LEFT */}
            {isAiThinking && (
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#6C5CE7] to-[#8E44AD] text-white shadow-xs shrink-0 mt-1">
                  <Bot size={16} />
                </div>
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-xs bg-white px-4 py-3 text-xs text-[#737069] border border-[#E5E0D7] shadow-xs">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#6C5CE7] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-[#6C5CE7] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-[#6C5CE7] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>AI 正在推理图片并匹配全套实物...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Clean Fixed Chat Input Bar */}
          <div className="fixed bottom-16 left-0 right-0 z-20 bg-gradient-to-t from-[#FBF9F5] via-[#FBF9F5]/90 to-transparent p-4 pb-safe">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            <form
              onSubmit={handleSend}
              className="mx-auto flex max-w-2xl items-center gap-2 rounded-2xl border border-[#E5E0D7] bg-white p-2 shadow-lg backdrop-blur-md"
            >
              {/* Upload Image Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4F1EA] text-[#1A1A18] hover:bg-[#EBE7DF] active:scale-95 transition-all shrink-0"
                title="上传照片识别风格"
              >
                <ImageIcon size={16} />
              </button>

              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="发送消息或上传照片进行风格识别..."
                className="flex-1 bg-transparent px-2 text-xs text-[#1A1A18] placeholder-[#9E9A91] outline-hidden"
              />

              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6C5CE7] text-white disabled:opacity-40 transition-opacity shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* ME Archive View */
        <div className="mx-auto max-w-2xl px-6 pt-4 w-full">
          <div className="flex items-center gap-4 rounded-2xl bg-white p-5 border border-[#E5E0D7] shadow-xs">
            <img
              src="/assets/img_creator_alex.jpg"
              alt="Luna"
              className="h-16 w-16 rounded-full object-cover border-2 border-[#E5E0D7]"
            />
            <div>
              <h3 className="font-editorial text-2xl font-normal text-[#1A1A18]">
                Luna
              </h3>
              <p className="text-xs text-[#737069]">
                Creative / Design / Photography
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-semibold text-[#737069] mb-3">
              我的收藏 ({savedProducts.length})
            </h4>

            <div className="space-y-2.5">
              {savedProducts.length === 0 ? (
                <div className="py-10 text-center text-xs text-[#737069]">
                  暂无收藏商品
                </div>
              ) : (
                savedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => openProductDetail(product)}
                    className="group flex cursor-pointer items-center justify-between rounded-xl bg-white p-3 border border-[#E5E0D7] shadow-xs hover:border-[#6C5CE7]/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover bg-[#F4F1EA]"
                      />
                      <div>
                        <h5 className="text-xs font-semibold text-[#1A1A18]">
                          {product.name}
                        </h5>
                        <p className="text-[11px] text-[#737069]">
                          {product.formattedPrice}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      size={14}
                      className="text-[#9E9A91] group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Replacement Modal with Random Shuffle Button (选择替换单品 + 随机切换) */}
      {replacingTarget && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-white p-4 sm:p-5 shadow-2xl max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E5E0D7] pb-3">
              <div>
                <h3 className="text-sm font-semibold text-[#1A1A18]">
                  选择替换单品
                </h3>
                <p className="text-[11px] text-[#737069] truncate max-w-[200px]">
                  原品: {replacingTarget.product.name}
                </p>
              </div>
              <button
                onClick={() => setReplacingTarget(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F1EA] text-[#737069] hover:text-[#1A1A18]"
              >
                <X size={14} />
              </button>
            </div>

            {/* Random Pick Button (随机切换按键) */}
            <div className="pt-3 pb-1">
              <button
                onClick={() => {
                  const candidates = products.filter(
                    (p) => p.id !== replacingTarget.product.id
                  );
                  if (candidates.length > 0) {
                    const randomPick =
                      candidates[Math.floor(Math.random() * candidates.length)];
                    replaceMatchedItem(
                      replacingTarget.messageId,
                      replacingTarget.product.id,
                      randomPick
                    );
                    setReplacingTarget(null);
                  }
                }}
                className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#8E44AD] text-xs font-semibold text-white shadow-xs hover:brightness-105 active:scale-98 transition-all"
              >
                <Dice5 size={14} />
                <span>🎲 随机切换一件同款单品</span>
              </button>
            </div>

            {/* Candidate List (简约纵向挑选) */}
            <div className="mt-2 flex-1 overflow-y-auto space-y-2 no-scrollbar py-1">
              {products
                .filter((p) => p.id !== replacingTarget.product.id)
                .map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => {
                      replaceMatchedItem(
                        replacingTarget.messageId,
                        replacingTarget.product.id,
                        candidate
                      );
                      setReplacingTarget(null);
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-xl p-2.5 border border-[#E5E0D7] hover:border-[#6C5CE7] hover:bg-[#F0EDFD]/30 transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <img
                        src={candidate.mainImage}
                        alt={candidate.name}
                        className="h-10 w-10 rounded-lg object-cover bg-[#F4F1EA] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-medium text-[#1A1A18] truncate">
                          {candidate.name}
                        </div>
                        <div className="text-[11px] font-bold text-[#6C5CE7]">
                          {candidate.formattedPrice}
                        </div>
                      </div>
                    </div>

                    <span className="rounded-lg bg-[#F4F1EA] hover:bg-[#6C5CE7] hover:text-white px-2.5 py-1 text-[11px] font-medium text-[#1A1A18] transition-colors shrink-0">
                      替换
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
