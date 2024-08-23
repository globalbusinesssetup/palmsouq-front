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
  user: Record<string, any> | null;
  login: (loginData: any) => void;
  logOut: () => void;
  isLoading: boolean;
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
  selling: number;
  offered: number;
  image: string;
  review_count: number;
  rating: number;
  price: number;
};

export type ProductsApiResponse = {
  data: {
    result: {
      data: ProductData[];
    };
  };
};

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
