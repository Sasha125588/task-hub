import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  dueDate: z
    .date({
      required_error: "Due date is required.",
      invalid_type_error: "Please select a valid date.",
    })
    .refine((date) => date > new Date(), {
      message: "Due date must be in the future.",
    }),
  iconName: z.string().optional(),
  subTasks: z.any(),
});
