export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  categoryTag: string;
  createdAt?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  creator: string;
  price: number;
  formattedPrice: string;
  mainImage: string;
  aspectRatio: number;
  secondaryImages: string[];
  category: string;
  shortDescription: string;
  aiSummary: string;
  reviews: Review[];
  specs: Record<string, string>;
  storeName: string;
  storeDescription?: string;
  storeImage?: string;
  contextStory?: string;
}

export interface ExhibitionChapter {
  chapterNumber: string;
  title: string;
  image: string;
  contentText: string;
  taggedProducts: ProductItem[];
}

export interface Exhibition {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  description: string;
  chapters: ExhibitionChapter[];
}

export interface Creator {
  id: string;
  name: string;
  tagline: string;
  portrait: string;
  bio: string;
  gridImages: string[];
  styleTags: string[];
}

export interface StoryParagraph {
  text: string;
  image?: string;
  productRef?: ProductItem;
}

export interface Story {
  id: string;
  title: string;
  creatorName: string;
  heroImage: string;
  paragraphs: StoryParagraph[];
}

export interface ScenePost {
  id: string;
  title: string;
  editorName: string;
  editorAvatar: string;
  coverImage: string;
  isVideo: boolean;
  mediaList: string[];
  linkedProducts: ProductItem[];
  aspectRatio: number;
  description: string;
}

export type FeedItem =
  | { type: 'product'; product: ProductItem }
  | { type: 'scene'; scenePost: ScenePost };

export interface CartItem {
  product: ProductItem;
  quantity: number;
  variant: string;
}

export interface QnaMessage {
  id: string;
  text: string;
  isUser: boolean;
  evidenceText?: string;
  timestamp?: string;
}

export interface AiChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  image?: string;
  styleTag?: string;
  matchedProducts?: ProductItem[];
  timestamp?: string;
}

export type MainTab = 'WORLD' | 'PERSONAL' | 'CART';
export type PersonalSubTab = 'AI' | 'ME';
