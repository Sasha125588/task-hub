import {
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
  fetchUserAttributes,
} from "aws-amplify/auth";

import type {
  ConfirmSignUpInput,
  ConfirmSignUpOutput,
  SignInInput,
  SignInOutput,
  SignUpInput,
  SignUpOutput,
} from "@/types/auth.types";

import "../../configs/amplify.config";
import { handleAuthError, validateAuthParameters } from "../../lib/utils/auth";

export const authAPI = {
  async signIn({ email, password }: SignInInput): Promise<SignInOutput> {
    try {
      if (!validateAuthParameters(email, password)) {
        throw new Error("Invalid authentication parameters");
      }

      const signInResult = await signIn({
        username: email,
        password,
      });

      const session = await fetchAuthSession();
      const accesToken = session.tokens?.accessToken;

      if (!signInResult) {
        throw new Error("No response from sign in");
      }

      return { isSignedInComplete: signInResult.isSignedIn, accesToken };
    } catch (error) {
      console.error("AuthAPI: Sign in failed:", error);
      return handleAuthError(error, "Sign in failed");
    }
  },

  async signUp({
    email,
    username,
    password,
  }: SignUpInput): Promise<SignUpOutput> {
    try {
      if (!validateAuthParameters(email, password)) {
        throw new Error("Invalid authentication parameters");
      }

      const signUpResult = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
            name: username || email,
          },
          autoSignIn: false,
        },
      });

      if (!signUpResult) {
        throw new Error("No response from sign up");
      }

      return {
        isSignUpComplete: signUpResult.isSignUpComplete,
      };
    } catch (error) {
      return handleAuthError(error, "Sign up failed");
    }
  },

  async signOut() {
    try {
      await signOut({ global: true });
    } catch (error) {
      return handleAuthError(error, "Sign out failed");
    }
  },

  async confirmSignUp({
    email,
    code,
  }: ConfirmSignUpInput): Promise<ConfirmSignUpOutput> {
    try {
      const confirmSignUpResult = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      if (!confirmSignUpResult) {
        throw new Error("No response from sign up");
      }
      return { isConfirmSignUpComplete: confirmSignUpResult.isSignUpComplete };
    } catch (error) {
      return handleAuthError(error, "Confirmation failed");
    }
  },

  async getCurrentUser() {
    try {
      const user = await getCurrentUser();
      const session = await fetchAuthSession();
      const attributes = await fetchUserAttributes();

      return {
        user: {
          ...user,
          attributes,
        },
        session,
      };
    } catch (error) {
      return handleAuthError(error, "Failed to get current user");
    }
  },

  async getSession() {
    try {
      return await fetchAuthSession();
    } catch (error) {
      return handleAuthError(error, "Failed to get session");
    }
  },
};
