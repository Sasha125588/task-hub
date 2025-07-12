"use client";

import { useEffect } from "react";

import { TaskEditForm } from "@/components/forms/TaskForm";
import { TaskModal } from "@/components/modals/TaskModal";

import { curTaskIdUpdated as updateCurTaskId } from "@/stores/task/store";

interface Props {
  id: string;
}

export function TastEdit({ id }: Props) {
  useEffect(() => {
    updateCurTaskId(id);
  }, [id]);

  return (
    <TaskModal>
      <TaskEditForm />
    </TaskModal>
  );
}
