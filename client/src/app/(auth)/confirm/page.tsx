import { ConfirmSignUpForm } from "@/components/forms/ConfirmSignUpForm";
import { Suspense } from "react";

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmSignUpForm />
    </Suspense>
  );
}
