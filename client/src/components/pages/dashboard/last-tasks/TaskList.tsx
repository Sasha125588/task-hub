"use client";

import { useUnit } from "effector-react";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import { Tabs } from "@/components/animate-ui/radix/tabs";

import { TaskListContent } from "./TaskListContent";
import { TaskListHeader } from "./TaskListHeader";
import { $statusType, statusTypeUpdated } from "@/stores/task/store";
import {
  StatusFilter,
  type TStatusFilter,
  type TaskStatuses,
} from "@/types/task.types";

export interface ITabs {
  title: string;
  value: string;
}

export function TaskList() {
  const statusType = useUnit($statusType);
  const updateStatusType = useUnit(statusTypeUpdated);

  const [, setUrlStatus] = useQueryState<TStatusFilter>(
    "status",
    parseAsStringLiteral(StatusFilter).withDefault("all")
  );

  const changeStatusType = (value: string) => {
    const newType = value as TaskStatuses;
    setUrlStatus(newType);
    updateStatusType(newType);
  };

  return (
    <Tabs defaultValue={statusType} dir="rtl" onValueChange={changeStatusType}>
      <TaskListHeader />
      <TaskListContent />
    </Tabs>
  );
}
