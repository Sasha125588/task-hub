import type { AuthUser } from "@aws-amplify/auth";

export interface User {
  cognitoInfo: AuthUser;
  userInfo: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface SignUpFormData {
  email: string;
  password: string;
  username: string;
}

export interface SignInResult {
  isSignedIn: boolean;
  error?: string;
  nextStep?: {
    signInStep: string;
  };
}

export interface SignUpResult {
  isSignUpComplete: boolean;
}
