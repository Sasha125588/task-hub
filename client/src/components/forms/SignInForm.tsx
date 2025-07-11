"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils/common";
import { SocialLoginButtons } from "../common/SocialLoginButtons";
import Link from "next/link";
import { loginFormSchema } from "@/lib/schemas/sign-in";
import { useAuth } from "@/hooks/useAuth";

type SignInFormValues = z.infer<typeof loginFormSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn, isLoading } = useAuth();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    if (isLoading) return;

    try {
      const loadingToast = toast.loading("Logging in...");
      const { isSignedInComplete } = await signIn({
        email: values.email,
        password: values.password,
      });

      if (isSignedInComplete) {
        toast.success("Successfully logged in!", {
          id: loadingToast,
        });
        window.location.href = "/dashboard";
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again.",
          {
            id: loadingToast,
          }
        );
        form.setValue("password", "");
      }
    } catch (err) {
      let errorMessage = "Failed to login. Please try again.";
      if (err instanceof Error) {
        errorMessage = err.message;

        if (
          err.message.includes("network") ||
          err.message.includes("Network")
        ) {
          errorMessage =
            "Network error. Please check your internet connection.";
        }
        if (err.message.includes("not confirmed")) {
          errorMessage = "Please confirm your email before logging in.";
        }
      }

      toast.error(errorMessage);
      form.setValue("password", "");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div
        className={cn(
          "flex w-full max-w-4xl flex-col items-center gap-6",
          className
        )}
        {...props}
      >
        <Card className="w-full overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your Task Hub account
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            aria-label="Email"
                            type="email"
                            placeholder="m@example.com"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <a
                            href="#"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <FormControl>
                          <Input
                            id="password"
                            aria-label="Password"
                            type="password"
                            placeholder="********"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-muted-foreground text-sm mt-2">
                          Password must be at least 8 characters and contain
                          uppercase, lowercase, and numbers
                        </p>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full cursor-pointer dark:hover:bg-zinc-50/80"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      Or continue with
                    </span>
                  </div>
                  <SocialLoginButtons />
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
            <div className="relative hidden md:block">
              <Image
                src="/images/login-image.webp"
                width={500}
                height={500}
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground bg-accent *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 w-1/2 text-balance rounded-lg p-4 text-center text-xs">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
