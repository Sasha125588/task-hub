import {
  $error,
  $isLoading,
  $user,
  checkAuthFx,
  signInFx,
  signOutFX,
  signUpFx,
} from "@/stores/auth";
import { useUnit } from "effector-react";

export function useAuth() {
  const user = useUnit($user);
  const error = useUnit($error);
  const isLoading = useUnit($isLoading);

  return {
    user,
    isLoading,
    error,
    checkAuth: checkAuthFx,
    signIn: signInFx,
    signUp: signUpFx,
    signOut: signOutFX,
  };
}
