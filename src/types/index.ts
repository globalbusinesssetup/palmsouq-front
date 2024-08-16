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
