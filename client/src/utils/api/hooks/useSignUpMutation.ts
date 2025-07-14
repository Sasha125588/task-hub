import { useMutation } from "@tanstack/react-query";

import { signUp } from "@/lib/better-auth/auth-client";

interface SignUpParams {
  email: string;
  password: string;
  username: string;
}

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async ({ email, password, username }: SignUpParams) => {
      return signUp.email({
        email,
        password,
        name: username,
      });
    },
  });
};
