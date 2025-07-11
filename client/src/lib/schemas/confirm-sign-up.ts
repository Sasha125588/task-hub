import z from "zod";

export const confirmSignUpSchema = z.object({
  code: z
    .string()
    .min(6, "Code must be 6 characters")
    .max(6, "Code must be 6 characters")
    .regex(/^\d+$/, "Code must contain only numbers"),
});
