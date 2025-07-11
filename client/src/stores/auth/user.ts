import { authAPI } from "@/services/api/auth.api";
import type {
  SignInInput,
  SignInOutput,
  SignUpInput,
  SignUpOutput,
  User,
} from "@/types/auth.types";
import { createEffect, createEvent, createStore } from "effector";
import { loadingReset, loadingUpdated } from "./isLoading";
import { errorUpdated } from "./error";
import { generateConfirmationToken } from "@/lib/utils/auth";
import Cookies from "js-cookie";

// STORES
export const $user = createStore<User | null>(null);

// EVENTS
export const userUpdated = createEvent<User>();
export const userReset = createEvent();

$user.on(userUpdated, (_, newUser) => newUser);
$user.on(userReset, () => null);

// EFFECTS
export const checkAuthFx = createEffect<void, void, Error>();
export const signInFx = createEffect<SignInInput, SignInOutput>();
export const signUpFx = createEffect<SignUpInput, SignUpOutput>();
export const signOutFX = createEffect<void, void, Error>();

checkAuthFx.use(async () => {
  try {
    loadingUpdated(true);
    errorUpdated("");
    const { user } = await authAPI.getCurrentUser();

    const userName =
      user.attributes?.name ||
      user.signInDetails?.loginId ||
      user.username ||
      user.userId;

    const displayName =
      userName && userName !== user.signInDetails?.loginId
        ? userName
        : user.signInDetails?.loginId || user.userId;

    userUpdated({
      cognitoInfo: user,
      userInfo: {
        id: user.userId,
        name: displayName,
        email: user.signInDetails?.loginId || "",
      },
    });
    loadingReset();
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Failed to check user";

    userReset();
    errorUpdated(errMsg);
  } finally {
    loadingReset();
  }
});

signInFx.use(async ({ email, password }) => {
  try {
    loadingUpdated(true);
    errorUpdated("");

    const result = await authAPI.signIn({ email, password });

    if (result.isSignedInComplete) {
      Cookies.set("accesToken", result.accesToken as unknown as string, {
        path: "/",
      });
      await checkAuthFx();
      window.location.href = "/dashboard";
    }

    return result;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Sign in failed";
    errorUpdated(errMsg);
    throw error;
  } finally {
    loadingReset();
  }
});

signUpFx.use(async ({ email, username, password }) => {
  try {
    loadingUpdated(true);
    errorUpdated("");

    const result = await authAPI.signUp({ email, password, username });

    if (!result.isSignUpComplete) {
      const confirmationToken = generateConfirmationToken();
      sessionStorage.setItem("confirmationToken", confirmationToken);

      const confirmUrl = `/confirm?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&token=${encodeURIComponent(confirmationToken)}`;
      window.location.href = confirmUrl;
    }

    return result;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Sign up failed";
    errorUpdated(errMsg);

    throw error;
  } finally {
    loadingReset();
  }
});

signOutFX.use(async () => {
  try {
    loadingUpdated(true);
    errorUpdated("");

    await authAPI.signOut();

    userReset();
    Cookies.remove("accesToken");

    window.location.href = "/signin";
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Sign out failed";
    errorUpdated(errMsg);

    throw error;
  } finally {
    loadingReset();
  }
});
