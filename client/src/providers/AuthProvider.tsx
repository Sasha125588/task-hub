// "use client";

// import {
//   createContext,
//   useContext,
//   useCallback,
//   useEffect,
//   useState,
// } from "react";
// import type { PropsWithChildren } from "react";
// import { useRouter } from "next/navigation";
// import { authAPI } from "@/services/api/auth.api";
// import type {
//   AuthState,
//   SignInInput,
//   SignInOutput,
//   SignUpInput,
//   SignUpOutput,
// } from "@/types/auth.types";
// import { generateConfirmationToken } from "@/lib/utils/auth";

// import "@/configs/amplify.config";

// interface AuthContextType extends AuthState {
//   signIn: (data: SignInInput) => Promise<SignInOutput>;
//   signUp: (data: SignUpInput) => Promise<SignUpOutput>;
//   signOut: () => Promise<void>;
//   checkAuth: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }: PropsWithChildren) => {
//   const router = useRouter();
//   const [state, setState] = useState<AuthState>({
//     user: null,
//     isLoading: true,
//     error: null,
//   });

//   const checkAuth = useCallback(async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true, error: null }));
//       const { user } = await authAPI.getCurrentUser();

//       const userName =
//         user.attributes?.name ||
//         user.signInDetails?.loginId ||
//         user.username ||
//         user.userId;

//       const displayName =
//         userName && userName !== user.signInDetails?.loginId
//           ? userName
//           : user.signInDetails?.loginId || user.userId;

//       setState((prev) => ({
//         ...prev,
//         user: {
//           cognitoInfo: user,
//           userInfo: {
//             id: user.userId,
//             name: displayName,
//             email: user.signInDetails?.loginId || "",
//           },
//         },
//         isLoading: false,
//       }));
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         user: null,
//         isLoading: false,
//         error: error instanceof Error ? error.message : "Authentication failed",
//       }));
//     }
//   }, []);

//   const signIn = useCallback(
//     async ({ email, password }: SignInInput): Promise<SignInOutput> => {
//       try {
//         setState((prev) => ({ ...prev, isLoading: true, error: null }));

//         const result = await authAPI.signIn({ email, password });

//         if (result.isSignedInComplete) {
//           await checkAuth();
//           window.location.href = "/dashboard";
//         }

//         return result;
//       } catch (error) {
//         setState((prev) => ({
//           ...prev,
//           isLoading: false,
//           error: error instanceof Error ? error.message : "Sign in failed",
//         }));
//         throw error;
//       } finally {
//         setState((prev) => ({ ...prev, isLoading: false }));
//       }
//     },
//     [checkAuth]
//   );

//   const signUp = useCallback(
//     async ({
//       email,
//       username,
//       password,
//     }: SignUpInput): Promise<SignUpOutput> => {
//       try {
//         setState((prev) => ({ ...prev, isLoading: true, error: null }));

//         const result = await authAPI.signUp({ email, password, username });

//         if (!result.isSignUpComplete) {
//           const confirmationToken = generateConfirmationToken();
//           sessionStorage.setItem("confirmationToken", confirmationToken);

//           const confirmUrl = `/confirm?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&token=${encodeURIComponent(confirmationToken)}`;
//           window.location.href = confirmUrl;
//         }

//         return result;
//       } catch (error) {
//         setState((prev) => ({
//           ...prev,
//           isLoading: false,
//           error: error instanceof Error ? error.message : "Sign up failed",
//         }));
//         throw error;
//       } finally {
//         setState((prev) => ({ ...prev, isLoading: false }));
//       }
//     },
//     []
//   );

//   const signOut = useCallback(async () => {
//     try {
//       setState((prev) => ({ ...prev, isLoading: true, error: null }));
//       await authAPI.signOut();
//       setState((prev) => ({
//         ...prev,
//         user: null,
//         isLoading: false,
//       }));
//       router.push("/login");
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         isLoading: false,
//         error: error instanceof Error ? error.message : "Sign out failed",
//       }));
//       throw error;
//     }
//   }, [router]);

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   const value = {
//     ...state,
//     signIn,
//     signUp,
//     signOut,
//     checkAuth,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
