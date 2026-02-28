export interface Product {
  _id: string;
  name: string;
  category: 'green' | 'roasted';
  description: string;
  price: number;
  image?: { url: string; publicId: string };
  variants: string[];
  stock: number;
  isActive: boolean;
  createdAt: string;
}

export interface Farm {
  _id: string;
  name: string;
  region: string;
  description?: string;
  image?: { url: string; publicId: string };
  order: number;
  isActive: boolean;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: { url: string; publicId: string };
  email?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  order: number;
  isActive: boolean;
}

export interface OrderItem {
  product: string;
  productName: string;
  variant: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city?: string;
    province?: string;
    zipCode?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'gcash' | 'bank_transfer' | 'cod' | 'maya';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  adminNotes?: string;
  contactChannel: 'whatsapp' | 'messenger';
  createdAt: string;
}

export interface SiteContent {
  _id: string;
  key: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroImage?: { url: string; publicId: string };
  weddingsTitle: string;
  weddingsDesc?: string;
  weddingsImage?: { url: string; publicId: string };
  birthdaysTitle: string;
  birthdaysDesc?: string;
  birthdaysImage?: { url: string; publicId: string };
  farmToursTitle: string;
  farmToursDesc?: string;
  farmToursImage?: { url: string; publicId: string };
  brandStoryText?: string;
  brandStoryImage?: { url: string; publicId: string };
  contactEmail?: string;
  contactPhone?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  whatsappNumber?: string;
  messengerUrl?: string;
}

// Fallback mock data for development (when API is not connected)
export const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Benguet Arabica Green Beans',
    category: 'green',
    description: 'Single-origin green coffee beans from the highlands of Benguet. Notes of citrus, stone fruit, and bright acidity. Perfect for home roasters.',
    price: 350,
    variants: ['250g', '500g', '1kg'],
    stock: 50,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Mt. Apo Robusta Green Beans',
    category: 'green',
    description: 'Bold and earthy Robusta beans from the slopes of Mt. Apo. High caffeine content with chocolate and woody notes.',
    price: 280,
    variants: ['250g', '500g', '1kg'],
    stock: 35,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    name: 'Sagada Medium Roast',
    category: 'roasted',
    description: 'Expertly roasted medium blend from Sagada. Balanced flavor with hints of caramel, nuts, and mild fruitiness. Ideal for pour-over and drip.',
    price: 480,
    variants: ['250g', '500g'],
    stock: 25,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '4',
    name: 'Kalinga Dark Espresso Roast',
    category: 'roasted',
    description: 'Full-bodied dark roast from Kalinga province. Rich, bold espresso with dark chocolate and smoky undertones. Perfect for espresso machines.',
    price: 520,
    variants: ['250g', '500g'],
    stock: 20,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '5',
    name: 'Ifugao Heirloom Light Roast',
    category: 'roasted',
    description: 'Delicate light roast preserving the terroir of Ifugao heirloom varieties. Floral, tea-like, with hints of jasmine and lemon zest.',
    price: 560,
    variants: ['250g', '500g'],
    stock: 15,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '6',
    name: 'Bukidnon Liberica Green Beans',
    category: 'green',
    description: 'Rare Liberica (Barako) green beans from Bukidnon. Distinctively woody, smoky aroma with a full-bodied cup. A uniquely Filipino coffee experience.',
    price: 420,
    variants: ['250g', '500g', '1kg'],
    stock: 10,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export const mockFarms: Farm[] = [
  {
    _id: '1',
    name: 'Benguet Highlands Farm',
    region: 'Benguet, Cordillera',
    description: 'Nestled at 1,500m elevation, our partner farm produces exceptional Arabica beans with natural shade-growing methods.',
    order: 0,
    isActive: true,
  },
  {
    _id: '2',
    name: 'Mt. Apo Coffee Estate',
    region: 'Davao, Mindanao',
    description: 'Located on the fertile slopes of the Philippines\' highest peak, producing rich Robusta and fine Arabica varieties.',
    order: 1,
    isActive: true,
  },
  {
    _id: '3',
    name: 'Sagada Mountain Farm',
    region: 'Mountain Province, Cordillera',
    description: 'Traditional farming communities using ancient Cordilleran agricultural practices passed down through generations.',
    order: 2,
    isActive: true,
  },
  {
    _id: '4',
    name: 'Kalinga Heritage Gardens',
    region: 'Kalinga, Cordillera',
    description: 'Indigenous-led cooperative preserving heirloom coffee varieties unique to the Kalinga uplands.',
    order: 3,
    isActive: true,
  },
];

export const mockTeamMembers: TeamMember[] = [
  {
    _id: '1',
    name: 'Maria Santos',
    role: 'Founder & Head Roaster',
    bio: 'With 15 years in the specialty coffee industry, Maria started Farm to Cup to connect Filipino farmers with coffee lovers nationwide.',
    order: 0,
    isActive: true,
  },
  {
    _id: '2',
    name: 'Juan dela Cruz',
    role: 'Farm Relations Manager',
    bio: 'Juan builds and nurtures relationships with our partner farms across the Philippines, ensuring fair trade and sustainable practices.',
    order: 1,
    isActive: true,
  },
  {
    _id: '3',
    name: 'Ana Reyes',
    role: 'Quality Control Specialist',
    bio: 'A certified Q Grader, Ana ensures every batch meets our rigorous standards from green bean selection to final roast profile.',
    order: 2,
    isActive: true,
  },
];
