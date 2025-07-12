import type { JWT } from "@aws-amplify/auth";

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
