import type { AuthUser, JWT } from "@aws-amplify/auth";

export interface User {
  cognitoInfo: AuthUser;
  userInfo: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignInOutput {
  isSignedInComplete: boolean;
  accesToken?: JWT;
}

export interface SignUpInput {
  email: string;
  password: string;
  username: string;
}

export interface SignUpOutput {
  isSignUpComplete: boolean;
}

export interface ConfirmSignUpInput {
  email: string;
  code: string;
}

export interface ConfirmSignUpOutput {
  isConfirmSignUpComplete: boolean;
}
