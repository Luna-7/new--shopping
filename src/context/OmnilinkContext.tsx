import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  ProductItem,
  CartItem,
  Exhibition,
  ScenePost,
  Story,
  Creator,
  FeedItem,
  MainTab,
  PersonalSubTab,
  QnaMessage,
  AiChatMessage,
} from '../types';
import { DataService } from '../services/dataService';
import { feedItemsList } from '../data/mockData';

interface OmnilinkContextType {
  // Navigation & Tabs
  mainTab: MainTab;
  selectTab: (tab: MainTab) => void;
  personalSubTab: PersonalSubTab;
  setPersonalSubTab: (subTab: PersonalSubTab) => void;

  // Repositories
  products: ProductItem[];
  feedItems: FeedItem[];
  scenePosts: ScenePost[];
  exhibitions: Exhibition[];
  creator: Creator;
  story: Story;

  // Active Overlays
  selectedFloatingProduct: ProductItem | null;
  openFloatingProduct: (product: ProductItem) => void;
  closeFloatingProduct: () => void;

  currentProductDetail: ProductItem | null;
  openProductDetail: (product: ProductItem) => void;
  closeProductDetail: () => void;

  currentScenePost: ScenePost | null;
  currentSceneIndex: number;
  openScenePost: (scenePost: ScenePost) => void;
  closeScenePost: () => void;
  nextScenePost: () => void;
  prevScenePost: () => void;

  currentExhibition: Exhibition | null;
  openExhibition: (exhibition: Exhibition) => void;
  closeExhibition: () => void;

  currentStoreName: string | null;
  openStore: (storeName: string) => void;
  closeStore: () => void;

  currentStory: Story | null;
  openStory: (story: Story) => void;
  closeStory: () => void;

  currentCreator: Creator | null;
  openCreator: (creator: Creator) => void;
  closeCreator: () => void;

  // Search
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  searchResults: ProductItem[];
  updateSearchQuery: (query: string) => void;

  // Reviews
  isReviewsOpen: boolean;
  openReviews: () => void;
  closeReviews: () => void;

  // Cart & Comparison
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: ProductItem, variant?: string) => void;
  addMultipleToCart: (products: ProductItem[]) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartComparisonPair: [ProductItem, ProductItem] | null;
  startCartComparison: (p1: ProductItem, p2: ProductItem) => void;
  closeCartComparison: () => void;

  // AI Conversational Image & Intent Reasoning
  aiMessages: AiChatMessage[];
  isAiThinking: boolean;
  sendAiMessage: (prompt: string) => void;
  sendAiImageMessage: (imageSrc: string, promptText?: string) => void;
  deleteMatchedItem: (messageId: string, productId: string) => void;
  replaceMatchedItem: (messageId: string, oldProductId: string, newProduct: ProductItem) => void;

  // Q&A
  qnaHistory: Record<string, QnaMessage[]>;
  askProductQna: (productId: string, question: string) => void;

  // Toast & Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Saved / Liked items
  savedProductIds: string[];
  toggleSaveProduct: (productId: string) => void;
}

const OmnilinkContext = createContext<OmnilinkContextType | undefined>(undefined);

export const OmnilinkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Main Tab State
  const [mainTab, setMainTab] = useState<MainTab>('WORLD');
  const [personalSubTab, setPersonalSubTab] = useState<PersonalSubTab>('AI');

  // Repositories
  const [products] = useState<ProductItem[]>(() => DataService.getProducts());
  const [feedItems] = useState<FeedItem[]>(feedItemsList);
  const [scenePosts] = useState<ScenePost[]>(() => DataService.getScenePosts());
  const [exhibitions] = useState<Exhibition[]>(() => DataService.getExhibitions());
  const [creator] = useState<Creator>(() => DataService.getCreator());
  const [story] = useState<Story>(() => DataService.getStory());

  // Overlays
  const [selectedFloatingProduct, setSelectedFloatingProduct] = useState<ProductItem | null>(null);
  const [currentProductDetail, setCurrentProductDetail] = useState<ProductItem | null>(null);
  const [currentScenePost, setCurrentScenePost] = useState<ScenePost | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
  const [currentStoreName, setCurrentStoreName] = useState<string | null>(null);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [currentCreator, setCurrentCreator] = useState<Creator | null>(null);

  // Search & Reviews
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductItem[]>([]);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => DataService.getCart());
  const [cartComparisonPair, setCartComparisonPair] = useState<[ProductItem, ProductItem] | null>(null);

  // Saved Products
  const [savedProductIds, setSavedProductIds] = useState<string[]>(() =>
    DataService.getSavedProductIds()
  );

  // Q&A & AI Chat
  const [qnaHistory, setQnaHistory] = useState<Record<string, QnaMessage[]>>(() =>
    DataService.getQnaHistory()
  );
  const [aiMessages, setAiMessages] = useState<AiChatMessage[]>(() =>
    DataService.getAiChatHistory()
  );
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Real-time synchronization across browser tabs
  useEffect(() => {
    const unsubscribe = DataService.subscribeToSync((event) => {
      if (event.type === 'CART_UPDATED') {
        setCartItems(event.payload as CartItem[]);
      } else if (event.type === 'SAVED_UPDATED') {
        setSavedProductIds(event.payload as string[]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    DataService.saveCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    DataService.saveProductIds(savedProductIds);
  }, [savedProductIds]);

  useEffect(() => {
    DataService.saveQnaHistory(qnaHistory);
  }, [qnaHistory]);

  useEffect(() => {
    DataService.saveAiChatHistory(aiMessages);
  }, [aiMessages]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Cart Actions
  const addToCart = useCallback(
    (product: ProductItem, variant: string = '标准') => {
      setCartItems((prev) => {
        const existingIdx = prev.findIndex((i) => i.product.id === product.id);
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + 1,
          };
          return updated;
        }
        return [...prev, { product, quantity: 1, variant }];
      });
      showToast(`已将 ${product.name} 加入购物车`);
    },
    [showToast]
  );

  const addMultipleToCart = useCallback(
    (productsToAdd: ProductItem[]) => {
      if (productsToAdd.length === 0) return;
      setCartItems((prev) => {
        let updated = [...prev];
        productsToAdd.forEach((product) => {
          const idx = updated.findIndex((i) => i.product.id === product.id);
          if (idx >= 0) {
            updated[idx] = {
              ...updated[idx],
              quantity: updated[idx].quantity + 1,
            };
          } else {
            updated.push({ product, quantity: 1, variant: '标准' });
          }
        });
        return updated;
      });
      showToast(`已批量添加 ${productsToAdd.length} 件商品至购物车`);
    },
    [showToast]
  );

  const updateCartQuantity = useCallback(
    (productId: string, delta: number) => {
      setCartItems((prev) =>
        prev
          .map((item) => {
            if (item.product.id === productId) {
              const newQty = item.quantity + delta;
              return newQty <= 0 ? null : { ...item, quantity: newQty };
            }
            return item;
          })
          .filter(Boolean) as CartItem[]
      );
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Overlays
  const openFloatingProduct = useCallback((product: ProductItem) => {
    setSelectedFloatingProduct(product);
  }, []);

  const closeFloatingProduct = useCallback(() => {
    setSelectedFloatingProduct(null);
  }, []);

  const openProductDetail = useCallback((product: ProductItem) => {
    setSelectedFloatingProduct(null);
    setCurrentProductDetail(product);
  }, []);

  const closeProductDetail = useCallback(() => {
    setCurrentProductDetail(null);
  }, []);

  const openScenePost = useCallback(
    (scenePost: ScenePost) => {
      const idx = scenePosts.findIndex((s) => s.id === scenePost.id);
      setCurrentSceneIndex(Math.max(0, idx));
      setCurrentScenePost(scenePost);
    },
    [scenePosts]
  );

  const closeScenePost = useCallback(() => {
    setCurrentScenePost(null);
  }, []);

  const nextScenePost = useCallback(() => {
    const nextIdx = (currentSceneIndex + 1) % scenePosts.length;
    setCurrentSceneIndex(nextIdx);
    setCurrentScenePost(scenePosts[nextIdx]);
  }, [currentSceneIndex, scenePosts]);

  const prevScenePost = useCallback(() => {
    const prevIdx =
      (currentSceneIndex - 1 + scenePosts.length) % scenePosts.length;
    setCurrentSceneIndex(prevIdx);
    setCurrentScenePost(scenePosts[prevIdx]);
  }, [currentSceneIndex, scenePosts]);

  const openExhibition = useCallback((exhibition: Exhibition) => {
    setCurrentExhibition(exhibition);
  }, []);

  const closeExhibition = useCallback(() => {
    setCurrentExhibition(null);
  }, []);

  const openStore = useCallback((storeName: string) => {
    setCurrentStoreName(storeName);
  }, []);

  const closeStore = useCallback(() => {
    setCurrentStoreName(null);
  }, []);

  const openStory = useCallback((s: Story) => {
    setCurrentStory(s);
  }, []);

  const closeStory = useCallback(() => {
    setCurrentStory(null);
  }, []);

  const openCreator = useCallback((c: Creator) => {
    setCurrentCreator(c);
  }, []);

  const closeCreator = useCallback(() => {
    setCurrentCreator(null);
  }, []);

  // Search
  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    const results = DataService.searchProducts(query);
    setSearchResults(results);
  }, []);

  // Reviews
  const openReviews = useCallback(() => {
    setIsReviewsOpen(true);
  }, []);

  const closeReviews = useCallback(() => {
    setIsReviewsOpen(false);
  }, []);

  // Cart Comparison
  const startCartComparison = useCallback(
    (p1: ProductItem, p2: ProductItem) => {
      setCartComparisonPair([p1, p2]);
    },
    []
  );

  const closeCartComparison = useCallback(() => {
    setCartComparisonPair(null);
  }, []);

  // Bookmarks
  const toggleSaveProduct = useCallback(
    (productId: string) => {
      setSavedProductIds((prev) => {
        const exists = prev.includes(productId);
        const updated = exists
          ? prev.filter((id) => id !== productId)
          : [...prev, productId];
        showToast(exists ? '已取消收藏' : '已加入我的收藏');
        return updated;
      });
    },
    [showToast]
  );

  // Q&A
  const askProductQna = useCallback(
    (productId: string, questionText: string) => {
      if (!questionText.trim()) return;
      const userMsg: QnaMessage = {
        id: `q_${Date.now()}`,
        text: questionText.trim(),
        isUser: true,
        timestamp: '刚刚',
      };

      setQnaHistory((prev) => ({
        ...prev,
        [productId]: [...(prev[productId] || []), userMsg],
      }));

      setTimeout(() => {
        const targetProd =
          products.find((p) => p.id === productId) || products[0];
        const { answer, evidence } = DataService.generateQnaAnswer(
          questionText,
          targetProd
        );
        const aiMsg: QnaMessage = {
          id: `a_${Date.now()}`,
          text: answer,
          isUser: false,
          evidenceText: evidence,
          timestamp: '官方认证',
        };
        setQnaHistory((prev) => ({
          ...prev,
          [productId]: [...(prev[productId] || []), aiMsg],
        }));
      }, 400);
    },
    [products]
  );

  // AI Conversational Text Message
  const sendAiMessage = useCallback((promptText: string) => {
    if (!promptText.trim()) return;
    const userMsg: AiChatMessage = {
      id: `m_${Date.now()}`,
      text: promptText.trim(),
      isUser: true,
      timestamp: '刚刚',
    };

    setAiMessages((prev) => [...prev, userMsg]);
    setIsAiThinking(true);

    setTimeout(() => {
      const { styleTag, analysisText, matchedProducts } =
        DataService.analyzeImageAndIntent(undefined, promptText);

      const aiResponse: AiChatMessage = {
        id: `m_${Date.now() + 1}`,
        text: analysisText,
        isUser: false,
        styleTag,
        matchedProducts,
        timestamp: 'AI 推理助手',
      };
      setAiMessages((prev) => [...prev, aiResponse]);
      setIsAiThinking(false);
    }, 600);
  }, []);

  // AI Conversational Image Upload & Reasoning
  const sendAiImageMessage = useCallback(
    (imageSrc: string, promptText?: string) => {
      const userMsg: AiChatMessage = {
        id: `m_${Date.now()}`,
        text: promptText || '上传了参考照片，请识别风格并匹配全套实物商品',
        isUser: true,
        image: imageSrc,
        timestamp: '刚刚',
      };

      setAiMessages((prev) => [...prev, userMsg]);
      setIsAiThinking(true);

      setTimeout(() => {
        const { styleTag, analysisText, matchedProducts } =
          DataService.analyzeImageAndIntent(imageSrc, promptText);

        const aiResponse: AiChatMessage = {
          id: `m_${Date.now() + 1}`,
          text: analysisText,
          isUser: false,
          styleTag,
          matchedProducts,
          timestamp: 'AI 推理助手',
        };
        setAiMessages((prev) => [...prev, aiResponse]);
        setIsAiThinking(false);
      }, 800);
    },
    []
  );

  // Delete Matched Item from AI Result List
  const deleteMatchedItem = useCallback((messageId: string, productId: string) => {
    setAiMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId && msg.matchedProducts) {
          return {
            ...msg,
            matchedProducts: msg.matchedProducts.filter((p) => p.id !== productId),
          };
        }
        return msg;
      })
    );
    showToast('已从搭配清单中移除该单品');
  }, [showToast]);

  // Replace Matched Item with New Product
  const replaceMatchedItem = useCallback(
    (messageId: string, oldProductId: string, newProduct: ProductItem) => {
      setAiMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId && msg.matchedProducts) {
            const updated = msg.matchedProducts.map((p) =>
              p.id === oldProductId ? newProduct : p
            );
            return {
              ...msg,
              matchedProducts: updated,
            };
          }
          return msg;
        })
      );
      showToast(`已替换为 ${newProduct.name}`);
    },
    [showToast]
  );

  return (
    <OmnilinkContext.Provider
      value={{
        mainTab,
        selectTab: setMainTab,
        personalSubTab,
        setPersonalSubTab,
        products,
        feedItems,
        scenePosts,
        exhibitions,
        creator,
        story,
        selectedFloatingProduct,
        openFloatingProduct,
        closeFloatingProduct,
        currentProductDetail,
        openProductDetail,
        closeProductDetail,
        currentScenePost,
        currentSceneIndex,
        openScenePost,
        closeScenePost,
        nextScenePost,
        prevScenePost,
        currentExhibition,
        openExhibition,
        closeExhibition,
        currentStoreName,
        openStore,
        closeStore,
        currentStory,
        openStory,
        closeStory,
        currentCreator,
        openCreator,
        closeCreator,
        isSearchOpen,
        setSearchOpen: setIsSearchOpen,
        searchQuery,
        searchResults,
        updateSearchQuery,
        isReviewsOpen,
        openReviews,
        closeReviews,
        cartItems,
        cartCount,
        addToCart,
        addMultipleToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartComparisonPair,
        startCartComparison,
        closeCartComparison,
        aiMessages,
        isAiThinking,
        sendAiMessage,
        sendAiImageMessage,
        deleteMatchedItem,
        replaceMatchedItem,
        qnaHistory,
        askProductQna,
        toastMessage,
        showToast,
        savedProductIds,
        toggleSaveProduct,
      }}
    >
      {children}
    </OmnilinkContext.Provider>
  );
};

export const useOmnilink = (): OmnilinkContextType => {
  const context = useContext(OmnilinkContext);
  if (!context) {
    throw new Error('useOmnilink must be used within an OmnilinkProvider');
  }
  return context;
};
