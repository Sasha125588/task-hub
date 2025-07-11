"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

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
import { SocialLoginButtons } from "@/components/common/SocialLoginButtons";

import { signUpFormSchema } from "@/lib/schemas/signup";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/better-auth/auth-client";
import { useState } from "react";

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit({ email, password, username }: SignUpFormValues) {
    const loadingToast = toast.loading("Creating your account...");

    await signUp.email({
      email,
      password,
      name: username,
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          toast.success("Account created successfully! Welcome to Task Hub!", {
            id: loadingToast,
          });
          router.push("/dashboard");
        },
        onError: () => {
          toast.error("Failed to create account. Please try again.", {
            id: loadingToast,
          });
        },
        onResponse: () => {
          setIsLoading(false);
        },
      },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className={"flex w-full max-w-4xl flex-col items-center gap-6"}>
        <Card className="w-full overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-balance">
                      Join Task Hub and start managing your tasks
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <FormControl>
                          <Input
                            id="username"
                            aria-label="Username"
                            type="text"
                            placeholder="johndoe"
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
                        <FormLabel htmlFor="password">Password</FormLabel>
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
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="confirmPassword">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            aria-label="Confirm Password"
                            type="password"
                            placeholder="********"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full cursor-pointer dark:hover:bg-zinc-50/80"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      Or continue with
                    </span>
                  </div>
                  <SocialLoginButtons />
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="underline underline-offset-4"
                    >
                      Login
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
