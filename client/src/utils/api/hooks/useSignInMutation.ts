import { useMutation } from "@tanstack/react-query";

import { signIn } from "@/lib/better-auth/auth-client";

interface SignInParams {
  email: string;
  password: string;
}

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: async ({ email, password }: SignInParams) => {
      return signIn.email({
        email,
        password,
      });
    },
  });
};
