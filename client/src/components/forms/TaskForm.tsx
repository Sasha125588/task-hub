"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { DatePicker } from "../common/DatePicker";
import { IconPicker } from "../common/IconPicker";
import { SubTaskList } from "../pages/dashboard/last-tasks/sub-tasks/SubTaskList";

import {
  $curTaskId,
  $getTaskByID,
  taskUpdated as updateTask,
} from "@/stores/task/store";
import { taskFormSchema } from "@/lib/schemas/task";

type TaskFormValues = z.infer<typeof taskFormSchema>;

export function TaskEditForm() {
  const router = useRouter();
  const id = useUnit($curTaskId);
  const { title, dueDate, iconName, subTasks } = useUnit($getTaskByID)(id)!;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title,
      dueDate,
      iconName,
      subTasks,
    },
  });

  function onSubmit(values: TaskFormValues) {
    updateTask({ id, ...values });
    toast("Task updated successfully", {
      description: `${format(new Date(), "Pp")}`,
    });
    router.back();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-8"
      >
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Task title"
                    aria-label="Task title"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <DatePicker
                    dateForm={field.value}
                    onChangeForm={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iconName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Icon</FormLabel>
                <FormControl>
                  <IconPicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="cursor-pointer" type="submit">
            Submit
          </Button>
        </div>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="subTasks"
            render={() => (
              <FormItem>
                <FormLabel className="pb-3.5"></FormLabel>
                <FormControl>
                  <SubTaskList id={id} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
