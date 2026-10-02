import {
  ProductItem,
  Review,
  Exhibition,
  Creator,
  Story,
  ScenePost,
  FeedItem,
} from '../types';

export const sampleReviews: Review[] = [
  {
    id: 'r1',
    author: 'Elena Vance',
    rating: 5.0,
    text: 'The brass patina and diffused glow create an intimate spatial atmosphere in my reading nook.',
    categoryTag: 'Quality',
    createdAt: '2 days ago',
  },
  {
    id: 'r2',
    author: 'Julian K.',
    rating: 4.8,
    text: 'Solid, heavy base. Exactly as described. Beautiful tactile finish.',
    categoryTag: 'Quality',
    createdAt: '1 week ago',
  },
  {
    id: 'r3',
    author: 'Marcus B.',
    rating: 4.5,
    text: 'Slightly larger than expected on a small desk, but the light warmth compensates completely.',
    categoryTag: 'Size',
    createdAt: '2 weeks ago',
  },
  {
    id: 'r4',
    author: 'Sofia N.',
    rating: 5.0,
    text: 'Architectural perfection. Arrived in plastic-free recycled linen packaging.',
    categoryTag: 'Shipping',
    createdAt: '3 weeks ago',
  },
  {
    id: 'r5',
    author: 'David R.',
    rating: 4.9,
    text: 'Built like a museum specimen. Exceptional tactile weight and craftsmanship.',
    categoryTag: 'Durability',
    createdAt: '1 month ago',
  },
  {
    id: 'r6',
    author: 'Chen L.',
    rating: 5.0,
    text: 'The retro key switches have the most satisfying tactile bounce. The dual rotary dials make audio editing effortless.',
    categoryTag: 'Comfort',
    createdAt: '3 days ago',
  },
  {
    id: 'r7',
    author: 'Hannah M.',
    rating: 4.9,
    text: 'The aluminum modular desk rack transformed my messy cable and tool collection into pure visual order.',
    categoryTag: 'Quality',
    createdAt: '5 days ago',
  },
];

export const lampProduct: ProductItem = {
  id: 'p_lamp_01',
  name: 'Bauhaus Arc Lamp',
  creator: 'Atelier NORD',
  price: 280.0,
  formattedPrice: '$280',
  mainImage: '/assets/img_product_lamp.jpg',
  aspectRatio: 1.25,
  secondaryImages: [
    '/assets/img_product_lamp.jpg',
    '/assets/img_creator_alex.jpg',
  ],
  category: 'Lighting',
  shortDescription: 'Architectural desk lamp forged from spun brass and raw concrete.',
  aiSummary:
    'Minimal form, solid construction, warm diffused light. High user satisfaction for workspace ambiance.',
  reviews: sampleReviews,
  specs: {
    Material: 'Brushed Brass & Cast Concrete Base',
    Dimensions: 'H 46cm × W 24cm × D 18cm',
    'Light Source': '2700K Warm Integrated LED (Dimmable)',
    Origin: 'Copenhagen, Denmark',
  },
  storeName: 'Atelier NORD',
  storeDescription:
    'Copenhagen studio exploring light, form, and architectural quietude.',
  storeImage: '/assets/img_creator_alex.jpg',
  contextStory:
    'Created to evoke the soft gradient of dawn light across a studio work surface.',
};

export const chairProduct: ProductItem = {
  id: 'p_chair_02',
  name: 'Mid-Century Lounge Chair',
  creator: 'Studio K',
  price: 1450.0,
  formattedPrice: '$1,450',
  mainImage: '/assets/img_product_chair.jpg',
  aspectRatio: 0.85,
  secondaryImages: [
    '/assets/img_product_chair.jpg',
    '/assets/img_exhibition_apartment.jpg',
  ],
  category: 'Furniture',
  shortDescription:
    'Low-slung lounge armchair upholstered in heavy oat linen blend.',
  aiSummary:
    'Ergonomic lounge posture with tactile natural linen texture. Praised for timeless architectural presence.',
  reviews: sampleReviews,
  specs: {
    Frame: 'Powder-coated Tubular Steel',
    Upholstery: '85% Belgian Flax Linen, 15% Virgin Wool',
    Dimensions: 'W 78cm × D 82cm × H 72cm',
    'Seat Height': '38cm',
  },
  storeName: 'Studio K',
  storeDescription:
    'Berlin design collective focusing on reductive furniture structures.',
  storeImage: '/assets/img_product_chair.jpg',
  contextStory:
    'Designed to sit low to the ground to shift spatial perspective in tall living spaces.',
};

export const vesselProduct: ProductItem = {
  id: 'p_vessel_03',
  name: 'Wabi Stoneware Vessel',
  creator: 'Maya S. Studio',
  price: 165.0,
  formattedPrice: '$165',
  mainImage: '/assets/img_creator_alex.jpg',
  aspectRatio: 1.0,
  secondaryImages: [
    '/assets/img_creator_alex.jpg',
    '/assets/img_product_lamp.jpg',
  ],
  category: 'Ceramics',
  shortDescription:
    'Hand-thrown vessel with unglazed matte tactile finish.',
  aiSummary:
    'Subtle organic asymmetry, unglazed raw stoneware finish. Each piece uniquely numbered.',
  reviews: sampleReviews,
  specs: {
    'Clay Body': 'Coarse Iron Stoneware',
    Finish: 'Natural Unglazed Exterior, Water-safe Interior',
    Height: '28cm',
  },
  storeName: 'Maya S. Studio',
  storeDescription:
    'Kyoto-trained ceramic artist crafting functional spatial sculptures.',
  storeImage: '/assets/img_creator_alex.jpg',
  contextStory:
    'Explores the beauty of unrefined earth and slow ceramic firing cycles.',
};

export const shelfProduct: ProductItem = {
  id: 'p_shelf_04',
  name: 'Minimalist Floating Shelf',
  creator: 'Atelier NORD',
  price: 210.0,
  formattedPrice: '$210',
  mainImage: '/assets/img_exhibition_apartment.jpg',
  aspectRatio: 1.4,
  secondaryImages: ['/assets/img_exhibition_apartment.jpg'],
  category: 'Storage',
  shortDescription:
    'Precision-machined solid walnut shelf with hidden steel mounting framework.',
  aiSummary:
    'Invisible spatial mounting, oiled solid walnut timber. Minimalist architectural wall anchor.',
  reviews: sampleReviews,
  specs: {
    Timber: 'Solid American Walnut',
    Capacity: 'Up to 25kg',
    Dimensions: 'L 90cm × D 22cm × H 4cm',
  },
  storeName: 'Atelier NORD',
  storeDescription:
    'Copenhagen studio exploring light, form, and architectural quietude.',
  storeImage: '/assets/img_creator_alex.jpg',
  contextStory:
    'Formulated to allow objects to float seamlessly against living room walls.',
};

export const clockProduct: ProductItem = {
  id: 'p_clock_05',
  name: 'Architectural Desk Clock',
  creator: 'Studio K',
  price: 190.0,
  formattedPrice: '$190',
  mainImage: '/assets/img_app_icon.jpg',
  aspectRatio: 1.0,
  secondaryImages: ['/assets/img_app_icon.jpg'],
  category: 'Objects',
  shortDescription:
    'Monolithic bead-blasted aluminum clock with silent sweep movement.',
  aiSummary:
    'Silent continuous motion, solid anodized aluminum body. Minimal dial index.',
  reviews: sampleReviews,
  specs: {
    Material: 'Anodized Aerospace Aluminum',
    Movement: 'Silent Japanese Quartz Sweep',
    Dimensions: '12cm × 12cm × 4cm',
  },
  storeName: 'Studio K',
  storeDescription:
    'Berlin design collective focusing on reductive furniture structures.',
  storeImage: '/assets/img_product_chair.jpg',
  contextStory:
    'A meditative physical timekeeper designed without digital distractions.',
};

export const headphonesProduct: ProductItem = {
  id: 'p_headphones_06',
  name: 'Spatial ANC Studio Headphones',
  creator: 'Acoustic Atelier',
  price: 340.0,
  formattedPrice: '$340',
  mainImage: '/assets/img_headphones.jpg',
  aspectRatio: 0.75,
  secondaryImages: [
    '/assets/img_headphones.jpg',
    '/assets/img_scene_collector.jpg',
  ],
  category: 'Audio & Objects',
  shortDescription:
    'Architectural over-ear studio monitors with square earcups, sage green acoustic mesh, and peach pivot accents.',
  aiSummary:
    'Studio-grade neutral acoustic tuning with physical tactile controls and breathable 3D-knit earcups for prolonged focus.',
  reviews: sampleReviews,
  specs: {
    Material: 'Sage Acoustic 3D Knit, Anodized Aluminum, Silicone Cushioning',
    Drivers: '40mm Custom Bio-Cellulose High-Resolution Transducers',
    Connectivity: 'Lossless Bluetooth 5.3 + 3.5mm Analog Audio Jack',
    'Battery Life': '45 Hours ANC Playback with Fast USB-C Recharging',
  },
  storeName: 'Acoustic Atelier',
  storeDescription:
    'Stockholm sound lab crafting minimalist audio hardware designed for quiet contemplation.',
  storeImage: '/assets/img_headphones.jpg',
  contextStory:
    'Sculpted to eliminate visual noise and acoustic fatigue in personal workspaces.',
};

export const keyboardProduct: ProductItem = {
  id: 'p_keyboard_07',
  name: '8Bit Retro Dual-Dial Mechanical Keyboard',
  creator: 'Studio K',
  price: 145.0,
  formattedPrice: '$145',
  mainImage: '/assets/img_keyboard.jpg',
  aspectRatio: 1.77,
  secondaryImages: [
    '/assets/img_keyboard.jpg',
    '/assets/img_scene_collector.jpg',
  ],
  category: 'Objects',
  shortDescription:
    'Tactile mechanical keyboard blending vintage computing aesthetics with dual analog control knobs and red arcade switches.',
  aiSummary:
    'Hot-swappable tactile mechanical switches, nostalgic grey/burgundy keycaps, and dual volume knobs.',
  reviews: sampleReviews,
  specs: {
    Layout: '87-Key TKL Layout with Dedicated Volume Rotary Knobs',
    Switches: 'Kailh Box White V2 Tactile / Gateron Linear Hot-Swap',
    Keycaps: 'Dye-Sublimated PBT Cherry Profile Keycaps',
    Connectivity: 'Tri-Mode (2.4GHz Wireless, Bluetooth, USB-C)',
  },
  storeName: 'Studio K',
  storeDescription:
    'Berlin design collective focusing on reductive furniture structures.',
  storeImage: '/assets/img_keyboard.jpg',
  contextStory:
    'A tactile homage to classic industrial interfaces of the late 20th century.',
};

export const cratesProduct: ProductItem = {
  id: 'p_crates_08',
  name: 'Modular 3-Tier Aluminum Desk Crates',
  creator: 'Atelier NORD',
  price: 125.0,
  formattedPrice: '$125',
  mainImage: '/assets/img_crates.jpg',
  aspectRatio: 1.33,
  secondaryImages: [
    '/assets/img_crates.jpg',
    '/assets/img_scene_collector.jpg',
  ],
  category: 'Storage',
  shortDescription:
    'Extruded architectural aluminum framework holding tri-color industrial utility storage organizers.',
  aiSummary:
    'Heavy-gauge aluminum extrusion structure with smooth-sliding stackable utility bins in vibrant adventure tones.',
  reviews: sampleReviews,
  specs: {
    Frame: '2020 T-Slot Anodized Aluminum Extrusion Profile',
    Crates: 'Heavy-Duty Recycled Polypropylene (Orange, Sage Green, Ivory)',
    Dimensions: 'W 38cm × D 26cm × H 34cm',
    Capacity: 'Up to 15kg load per tier',
  },
  storeName: 'Atelier NORD',
  storeDescription:
    'Copenhagen studio exploring light, form, and architectural quietude.',
  storeImage: '/assets/img_crates.jpg',
  contextStory:
    'Brings precision industrial workshop organization directly onto the creative studio desk.',
};

export const mobileTableProduct: ProductItem = {
  id: 'p_table_09',
  name: 'Mobile Architectural Acrylic Side Table',
  creator: 'Maya S. Studio',
  price: 380.0,
  formattedPrice: '$380',
  mainImage: '/assets/img_mobile_table.jpg',
  aspectRatio: 0.75,
  secondaryImages: [
    '/assets/img_mobile_table.jpg',
    '/assets/img_scene_jungle.jpg',
  ],
  category: 'Furniture',
  shortDescription:
    'Glossy vermillion red acrylic tabletop mounted on chrome modular steel framework with smooth industrial caster wheels.',
  aiSummary:
    'Versatile mobile spatial companion. Easily rolls between lounge areas and studio workspaces.',
  reviews: sampleReviews,
  specs: {
    Top: '12mm Solid Cast Glossy Vermillion Acrylic',
    Structure: 'Chrome-plated Structural Steel Tubing Framework',
    Mobility: '4× 360° Heavy-Duty Locking Industrial Casters',
    Dimensions: 'W 48cm × D 38cm × H 62cm',
  },
  storeName: 'Maya S. Studio',
  storeDescription:
    'Kyoto-trained ceramic artist crafting functional spatial sculptures.',
  storeImage: '/assets/img_mobile_table.jpg',
  contextStory:
    'Conceived as a fluid, nomadic surface for pour-over coffee, sketchpads, and ambient lighting.',
};

export const linenCoatProduct: ProductItem = {
  id: 'p_coat_10',
  name: 'Belgian Heavy Flax Linen Chore Coat',
  creator: 'Atelier NORD',
  price: 260.0,
  formattedPrice: '$260',
  mainImage: '/assets/img_outfit_styled_1.jpg',
  aspectRatio: 0.75,
  secondaryImages: [
    '/assets/img_outfit_styled_1.jpg',
    '/assets/img_creator_alex.jpg',
  ],
  category: 'Apparel',
  shortDescription:
    'Unstructured boxy over-jacket tailored from 420gsm raw unbleached Belgian linen with horn buttons.',
  aiSummary:
    'Breathable heavy flax linen with an architectural spatial drape. Develops natural softness and character over seasons.',
  reviews: sampleReviews,
  specs: {
    Material: '100% Organic Belgian Flax Linen (420gsm)',
    Buttons: 'Natural Buffalo Horn Buttons',
    Origin: 'Porto, Portugal',
    Fit: 'Boxy Relaxed Silhouette',
  },
  storeName: 'Atelier NORD',
  storeDescription:
    'Copenhagen studio exploring light, form, and architectural quietude.',
  storeImage: '/assets/img_outfit_styled_1.jpg',
  contextStory:
    'Designed to feel effortless whether working in a sunlit studio or walking through brisk city streets.',
};

export const knitSweaterProduct: ProductItem = {
  id: 'p_sweater_11',
  name: 'Merino Chunky Ribbed Cardigan',
  creator: 'Studio K',
  price: 220.0,
  formattedPrice: '$220',
  mainImage: '/assets/img_outfit_styled_2.jpg',
  aspectRatio: 0.75,
  secondaryImages: [
    '/assets/img_outfit_styled_2.jpg',
    '/assets/img_keyboard.jpg',
  ],
  category: 'Apparel',
  shortDescription:
    'Oversized architectural knit cardigan spun from 100% extra-fine non-mulesed merino wool.',
  aiSummary:
    'Generous silhouette with dropped shoulders and textured fisherman rib stitch. Ideal layer for creative focus.',
  reviews: sampleReviews,
  specs: {
    Yarn: '100% Extra-fine Merino Wool (19.5 Micron)',
    Gauge: '5-Gauge Heavyweight Fisherman Rib',
    Fit: 'Relaxed Dropped-Shoulder Silhouette',
  },
  storeName: 'Studio K',
  storeDescription:
    'Berlin design collective focusing on reductive furniture structures.',
  storeImage: '/assets/img_outfit_styled_2.jpg',
  contextStory:
    'Crafted to wrap the body in quiet warmth while manipulating physical objects.',
};

export const productsList: ProductItem[] = [
  lampProduct,
  chairProduct,
  headphonesProduct,
  keyboardProduct,
  linenCoatProduct,
  knitSweaterProduct,
  cratesProduct,
  mobileTableProduct,
  vesselProduct,
  shelfProduct,
  clockProduct,
];

export const sampleScene1: ScenePost = {
  id: 'scene_01',
  title: 'Nordic Living Sanctuary Lookbook',
  editorName: 'Elena Vance',
  editorAvatar: '/assets/img_creator_alex.jpg',
  coverImage: '/assets/img_exhibition_apartment.jpg',
  isVideo: false,
  mediaList: [
    '/assets/img_exhibition_apartment.jpg',
    '/assets/img_product_chair.jpg',
    '/assets/img_product_lamp.jpg',
  ],
  linkedProducts: [chairProduct, lampProduct, shelfProduct],
  aspectRatio: 0.85,
  description:
    'A quiet residential setup combining raw Belgian linen lounge seating with warm brass directional lighting.',
};

export const sampleScene2: ScenePost = {
  id: 'scene_02',
  title: 'Evening Desk Ambiance Video Tour',
  editorName: 'Studio NORD',
  editorAvatar: '/assets/img_product_lamp.jpg',
  coverImage: '/assets/img_product_lamp.jpg',
  isVideo: true,
  mediaList: ['/assets/img_product_lamp.jpg', '/assets/img_app_icon.jpg'],
  linkedProducts: [lampProduct, clockProduct],
  aspectRatio: 1.3,
  description:
    'Exploring warm 2700K illumination and silent mechanical clockwork for zero-distraction late night study.',
};

export const sampleScene3: ScenePost = {
  id: 'scene_03',
  title: 'Tactile Wabi-Sabi Tea Corner',
  editorName: 'Maya S.',
  editorAvatar: '/assets/img_creator_alex.jpg',
  coverImage: '/assets/img_creator_alex.jpg',
  isVideo: false,
  mediaList: [
    '/assets/img_creator_alex.jpg',
    '/assets/img_exhibition_apartment.jpg',
  ],
  linkedProducts: [vesselProduct, shelfProduct],
  aspectRatio: 0.95,
  description:
    'Coarse iron stoneware vessels displayed on invisible floating solid walnut shelves.',
};

export const sampleScene4: ScenePost = {
  id: 'scene_04',
  title: 'Sunlit Botanical Workspace & Plant Oasis',
  editorName: 'Elena Vance',
  editorAvatar: '/assets/img_creator_alex.jpg',
  coverImage: '/assets/img_scene_jungle.jpg',
  isVideo: true,
  mediaList: ['/assets/img_scene_jungle.jpg', '/assets/img_mobile_table.jpg'],
  linkedProducts: [chairProduct, mobileTableProduct, headphonesProduct],
  aspectRatio: 1.33,
  description:
    'A tranquil indoor jungle workspace blending lush banana plants, monstera foliage, and ergonomic digital creation gear for deep flow.',
};

export const sampleScene5: ScenePost = {
  id: 'scene_05',
  title: 'Cozy Collector Desk Sanctuary Lookbook',
  editorName: 'Luna',
  editorAvatar: '/assets/img_creator_alex.jpg',
  coverImage: '/assets/img_scene_collector.jpg',
  isVideo: false,
  mediaList: [
    '/assets/img_scene_collector.jpg',
    '/assets/img_crates.jpg',
    '/assets/img_keyboard.jpg',
  ],
  linkedProducts: [cratesProduct, keyboardProduct, lampProduct],
  aspectRatio: 0.75,
  description:
    'An intimate creative corner with retro mechanical controls, blue task lighting, wooden archival cubbies, and cherished collectible artifacts.',
};

export const scenePostsList: ScenePost[] = [
  sampleScene5,
  sampleScene4,
  sampleScene1,
  sampleScene2,
  sampleScene3,
];

export const feedItemsList: FeedItem[] = [
  { type: 'product', product: headphonesProduct },
  { type: 'scene', scenePost: sampleScene5 },
  { type: 'product', product: keyboardProduct },
  { type: 'scene', scenePost: sampleScene4 },
  { type: 'product', product: linenCoatProduct },
  { type: 'product', product: cratesProduct },
  { type: 'product', product: knitSweaterProduct },
  { type: 'product', product: mobileTableProduct },
  { type: 'scene', scenePost: sampleScene1 },
  { type: 'product', product: lampProduct },
  { type: 'scene', scenePost: sampleScene2 },
  { type: 'product', product: chairProduct },
  { type: 'scene', scenePost: sampleScene3 },
  { type: 'product', product: vesselProduct },
  { type: 'product', product: shelfProduct },
  { type: 'product', product: clockProduct },
];

export const mainExhibition: Exhibition = {
  id: 'ex_first_apartment',
  title: 'THE FIRST APARTMENT',
  subtitle: 'Make a place your own.',
  coverImage: '/assets/img_scene_collector.jpg',
  description:
    'An editorial curation exploring essential tactile objects, personal archives, and tranquil lighting that transform bare walls into a personal sanctuary.',
  chapters: [
    {
      chapterNumber: 'Chapter 01',
      title: 'THE COLLECTOR DESK',
      image: '/assets/img_scene_collector.jpg',
      contentText:
        'A workspace comes alive when tactile curiosities, mechanical tools, and soft lighting meet. Selecting your anchor pieces creates a deeply personal atmosphere.',
      taggedProducts: [keyboardProduct, cratesProduct, lampProduct],
    },
    {
      chapterNumber: 'Chapter 02',
      title: 'THE BOTANICAL STUDIO',
      image: '/assets/img_scene_jungle.jpg',
      contentText:
        'Living green foliage filters natural morning light. Rolling mobile workstations allow fluid transitions between deep concentration and contemplative rest.',
      taggedProducts: [mobileTableProduct, headphonesProduct, chairProduct],
    },
    {
      chapterNumber: 'Chapter 03',
      title: 'OBJECTS OF SILENCE',
      image: '/assets/img_exhibition_apartment.jpg',
      contentText:
        'Minimal furniture and unglazed stoneware absorb acoustic echoes, creating a serene sanctuary in the heart of the city.',
      taggedProducts: [chairProduct, vesselProduct, shelfProduct],
    },
  ],
};

export const exhibitionsList: Exhibition[] = [
  mainExhibition,
  {
    id: 'ex_modern_workspaces',
    title: 'THE MODERN WORKSPACE',
    subtitle: 'Tactile instruments for creative flow.',
    coverImage: '/assets/img_scene_jungle.jpg',
    description:
      'A visual celebration of industrial aluminum storage, retro mechanical keyboards, studio acoustic monitors, and living botanical spaces.',
    chapters: [
      {
        chapterNumber: 'Chapter 01',
        title: 'TACTILE INTERFACES',
        image: '/assets/img_keyboard.jpg',
        contentText:
          'Physical rotary dials, mechanical switches, and textured aluminum organizers reconnect our tactile senses to daily creative output.',
        taggedProducts: [keyboardProduct, cratesProduct],
      },
    ],
  },
];

export const sampleCreator: Creator = {
  id: 'c_alex',
  name: 'Alex',
  tagline: 'Objects / Architecture / Modernism',
  portrait: '/assets/img_creator_alex.jpg',
  bio: 'Berlin-based spatial designer exploring minimalist residential interiors and tactile object curations.',
  gridImages: [
    '/assets/img_scene_collector.jpg',
    '/assets/img_headphones.jpg',
    '/assets/img_keyboard.jpg',
    '/assets/img_scene_jungle.jpg',
    '/assets/img_crates.jpg',
    '/assets/img_mobile_table.jpg',
  ],
  styleTags: ['Bauhaus', 'Minimal', 'Warm', 'Botanical', 'Retro Industrial'],
};

export const sampleStory: Story = {
  id: 's_bauhaus_workspace',
  title: 'HOW I BUILT MY BAUHAUS WORKSPACE',
  creatorName: 'Alex',
  heroImage: '/assets/img_scene_collector.jpg',
  paragraphs: [
    {
      text: 'Designing a focused workspace is not about adding features—it is about removing visual noise until only intention remains.',
    },
    {
      text: 'I selected lighting and tactile mechanical controls as my primary spatial anchors. The gentle glow casts an intimate circle of light on paper.',
      image: '/assets/img_keyboard.jpg',
      productRef: keyboardProduct,
    },
    {
      text: 'Acoustic calm and modular aluminum storage allow objects to maintain their functional place while preserving mental clarity.',
      image: '/assets/img_headphones.jpg',
      productRef: headphonesProduct,
    },
  ],
};
