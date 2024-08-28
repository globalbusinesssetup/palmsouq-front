export type LoginForm = {
  email: string;
  password?: string;
};
export type RegisterForm = {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
};

export type AuthContextTypes = {
  isLoggedIn: boolean;
  user?: Record<string, any>;
  login: (loginData: any) => void;
  logOut: () => void;
  removeOrders: () => void;
  addOrders: (products: CartItem[]) => void;
  isLoading: boolean;
  categories: Categorydata[];
  languages: [];
  payment: [];
  social: [];
  ordersData: CartItem[] | [];
  default_language: {
    name: string;
    code: string;
  };
};

type UserType = 'personal' | 'business';

export type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string | null;
  trade_license: string | null;
  trn_certificate: string | null;
  user_type: UserType;
  name: string;
  email: string;
  google_id: string | null;
  facebook_id: string | null;
  verified: number;
  default_address: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
  viewed: number;
  cart_count: number;
  is_logged_in: boolean;
};

export type ProfileApiResponse = {
  data: UserData;
  status: number;
  token: string | null;
  message: string;
};

// Profil

export type ProductData = {
  id: number;
  badge: string;
  title: string;
  slug: string;
  selling: number | string;
  offered: number | string;
  image: string;
  review_count: number;
  rating: number;
};

export type ProductsApiResponse = {
  data: {
    result: {
      data: ProductData[];
    };
  };
};

interface SingleProductData {
  id: number;
  title: string;
  description: string;
  overview: string;
  unit: string;
  badge: string | null;
  meta_title: string;
  meta_description: string;
  tags: string | null;
  selling: number;
  purchased: number;
  offered: number;
  image: string;
  video: string | null;
  video_thumb: string | null;
  status: string;
  category_id: string;
  subcategory_id: string | null;
  warranty: string | null;
  refundable: string;
  tax_rule_id: string;
  shipping_rule_id: string;
  review_count: number;
  rating: number;
  bundle_deal_id: string;
  brand_id: string;
  created_at: string;
  updated_at: string;
  admin_id: string;
  slug: string;
  price: string | null;
  end_time: string | null;
  wishlisted: string | null;
  category_data: Category[];
  current_categories: Category[];
  inventory: Inventory[];
  vouchers: Voucher[];
  time_zone: string;
  in_stock: boolean;
  attribute: Attribute[];
  brand: string | null;
  store: Store;
  bundle_deal: BundleDeal;
  product_image_names: string[];
  shipping_rule: ShippingRule;
}

interface Category {
  id: number;
  title: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  image?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  parent?: string;
  featured?: string;
  in_footer?: string;
}

interface Inventory {
  id: number;
  created_at: string;
  updated_at: string;
  product_id: string;
  quantity: string;
  price: string;
  sku: string | null;
  inventory_attributes: InventoryAttribute[];
}

interface InventoryAttribute {
  inventory_id: string;
  attribute_value_id: string;
}

interface Voucher {
  title: string;
  price: string;
  type: string;
  code: string;
  min_spend: string;
  usage_limit: string;
  limit_per_customer: string;
}

interface Attribute {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  values: AttributeValue[];
}

interface AttributeValue {
  id: number;
  title: string;
  attribute_id: string;
  created_at: string;
  updated_at: string;
  inventory_id: string;
  attribute_value_id: string;
  product_id: string;
  quantity: string;
  price: string;
  sku: string | null;
}

interface Store {
  id: number;
  image: string;
  name: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
  whatsapp_btn: number;
  whatsapp_number: string;
  whatsapp_default_msg: string;
}

interface BundleDeal {
  id: number;
  buy: string;
  free: string;
  title: string;
}

interface ShippingRule {
  id: number;
  title: string;
  single_price: number;
  shipping_places: ShippingPlace[];
}

interface ShippingPlace {
  id: number;
  country: string;
  state: string;
  price: string;
  day_needed: string;
  pickup_price: string;
  pickup_point: string;
  shipping_rule_id: string;
  pickup_phone: string;
  pickup_address_line_1: string;
  pickup_address_line_2: string;
  pickup_zip: string;
  pickup_state: string;
  pickup_city: string;
  pickup_country: string;
}

export interface ProductResponse {
  data: SingleProductData;
  status: number;
  token: string | null;
  message: string;
}

// Category

export type SubCategory = {
  id: number;
  title: string;
  slug: string;
  parent: number;
};

export type Categorydata = {
  id: number;
  title: string;
  slug: string;
  in_footer_child: SubCategory[];
};

// Address

export type Address = {
  id: number;
  user_id: number;
  country: string;
  state: string;
  city: string;
  zip: string;
  address_1: string;
  address_2: string;
  name: string;
  phone: string;
  delivery_instruction: string | null;
  default: number;
  user_token: string | null;
  email: string;
  created: string;
};

export type Collection = {
  id: number;
  title: string;
  slug: string;
  product_collections: ProductData[];
};

export type Banner = {
  id: number;
  image: string;
};

type Place = {
  id: number;
  country: string;
};

export type CartItem = {
  id: number;
  flash_product: {
    offered: number;
    selling: number;
    shipping_rule: {
      shipping_places: Place[];
    };
  };
  quantity: string;
};
