"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { confirmSignUpSchema } from "@/lib/schemas/confirm-signup";
import { useEffect } from "react";

type ConfirmSignUpFormValues = z.infer<typeof confirmSignUpSchema>;

export function ConfirmSignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email")!;
  const confirmationToken = searchParams.get("token");

  const storedToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("confirmationToken")
      : null;

  const form = useForm<ConfirmSignUpFormValues>({
    resolver: zodResolver(confirmSignUpSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    if (!email || !confirmationToken) {
      toast.error("Invalid confirmation link. Please try signing up again.");
      router.push("/signup");
      return;
    }
  }, [email, confirmationToken, router, storedToken]);

  function onSubmit({ code }: ConfirmSignUpFormValues) {
    console.log(code);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-4xl flex-col items-center gap-6">
        <Card className="w-full overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Confirm your email</h1>
                    <p className="text-muted-foreground text-balance max-w-sm">
                      {email ? (
                        <>
                          We sent a confirmation code to{" "}
                          <span className="font-medium text-foreground">
                            {email}
                          </span>
                          . Please enter it below to verify your account.
                        </>
                      ) : (
                        "Please enter the confirmation code we sent to your email to verify your account."
                      )}
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmation code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter the 6-digit code"
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="text-center text-lg tracking-widest"
                            maxLength={6}
                            onChange={(e) => {
                              const value = e.target.value
                                .slice(0, 6)
                                .replace(/\D/g, "");
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Confirm Email
                  </Button>
                  <div className="text-center text-sm">
                    Didn&apos;t receive the code?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/signup")}
                      className="text-primary hover:underline underline-offset-4"
                    >
                      Sign up again
                    </button>
                  </div>
                </div>
              </form>
            </Form>
            <div className="relative hidden md:block">
              <Image
                src="/images/login-image.webp"
                width={500}
                height={500}
                alt="Confirmation illustration"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
        <div className="w-[53%] text-muted-foreground bg-accent *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 text-balance rounded-lg p-4 text-center text-xs">
          By confirming your email, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
