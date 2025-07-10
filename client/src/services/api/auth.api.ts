import {
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
  fetchUserAttributes,
} from "aws-amplify/auth";

import type { SignInResult } from "@/types/auth.types";
import type { SignUpFormData } from "@/types/auth.types";

import "../../configs/amplify.config";
import { validateAuthParameters } from "../../lib/utils/auth";

const handleAuthError = (error: unknown, defaultMessage: string): never => {
  console.error(defaultMessage, error);

  if (error instanceof Error) {
    if (
      error.message.includes("incorrect username or password") ||
      error.message.includes("NotAuthorizedException")
    ) {
      throw new Error("Incorrect email or password");
    }
    if (
      error.message.includes("User does not exist") ||
      error.message.includes("UserNotFoundException")
    ) {
      throw new Error("User not found");
    }
    if (error.message.includes("Password attempts exceeded")) {
      throw new Error("Too many failed attempts. Please try again later");
    }
    if (
      error.message.includes("User is not confirmed") ||
      error.message.includes("NotConfirmedException")
    ) {
      throw new Error("Please confirm your email before logging in");
    }
    if (error.message.includes("UserUnAuthenticatedException")) {
      throw new Error(
        "Authentication configuration error. Please check your AWS Cognito setup."
      );
    }
    if (error.message.includes("InvalidParameterException")) {
      throw new Error("Invalid parameters provided. Please check your input.");
    }
    if (error.message.includes("UsernameExistsException")) {
      throw new Error("User with this email already exists.");
    }
    throw error;
  }
  throw new Error(defaultMessage);
};

export const authAPI = {
  async signIn(email: string, password: string): Promise<SignInResult> {
    try {
      if (!validateAuthParameters(email, password)) {
        throw new Error("Invalid authentication parameters");
      }

      const signInResult = await signIn({
        username: email,
        password,
      });

      if (!signInResult) {
        throw new Error("No response from sign in");
      }

      return { isSignedIn: signInResult.isSignedIn };
    } catch (error) {
      console.error("AuthAPI: Sign in failed:", error);
      return handleAuthError(error, "Sign in failed");
    }
  },

  async signUp(data: SignUpFormData): Promise<{ isSignUpComplete: boolean }> {
    try {
      if (!validateAuthParameters(data.email, data.password)) {
        throw new Error("Invalid authentication parameters");
      }

      const signUpResult = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
            name: data.username || data.email,
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
      console.error("AuthAPI: Sign up failed:", error);
      return handleAuthError(error, "Sign up failed");
    }
  },

  async signOut(): Promise<void> {
    try {
      await signOut({ global: true });
    } catch (error) {
      return handleAuthError(error, "Sign out failed");
    }
  },

  async confirmSignUp(
    email: string,
    code: string
  ): Promise<{ isSignUpComplete: boolean }> {
    try {
      const confirmSignUpResult = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      if (!confirmSignUpResult) {
        throw new Error("No response from sign up");
      }
      return { isSignUpComplete: confirmSignUpResult.isSignUpComplete };
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
