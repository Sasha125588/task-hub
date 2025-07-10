"use client";

import { useUnit } from "effector-react";
import { motion } from "motion/react";
import Link from "next/link";

import {
  AvatarGroup,
  AvatarGroupTooltip,
} from "@/components/animate-ui/components/avatar-group";
import { IconDisplay } from "@/components/common/IconPicker";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

import { PAGES_CONFIG } from "@/configs/pages.config";
import { $filteredTasks } from "@/stores/task/store";

const timeSlots = [
  "9 am",
  "10 am",
  "11 am",
  "12 pm",
  "1 pm",
  "2 pm",
  "3 pm",
  "4 pm",
  "5 pm",
];

const getTimePosition = (time?: string) => {
  if (!time) return 0;
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  const startMinutes = 9 * 60; // начало рабочег дня
  const endMinutes = 17 * 60; // конец рабочего дня
  const allMinutes = endMinutes - startMinutes;

  return ((totalMinutes - startMinutes) / allMinutes) * 100;
};

const getTaskWidth = (startTime?: string, endTime?: string) => {
  if (!startTime || !endTime) return 20;
  const start = getTimePosition(startTime);
  const end = getTimePosition(endTime);
  return end - start;
};

const getCurrentTimePosition = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return getTimePosition(`${hours}:${minutes}`);
};

export function TodayTasksTimeline() {
  const tasks = useUnit($filteredTasks);
  const todayTasks = tasks.filter(
    (task) =>
      task.startTime &&
      task.endTime &&
      task.dueDate.toDateString() === new Date().toDateString()
  );

  const currentTimePosition = getCurrentTimePosition();
  const isWithinWorkHours =
    currentTimePosition >= 0 && currentTimePosition <= 100;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Today&apos;s Tasks</h2>
          <p className="text-muted-foreground text-sm">
            {todayTasks.length
              ? `${todayTasks.length} task${todayTasks.length === 1 ? "" : "s"} scheduled for today`
              : "No tasks scheduled for today"}
          </p>
        </div>
        <AvatarGroup className="-space-x-3">
          {Array.from(new Set(todayTasks.flatMap((task) => task.users))).map(
            (user, idx) => (
              <Avatar key={idx} className="border-background size-9 border-1">
                <AvatarImage src={user.src} />
                <AvatarGroupTooltip>
                  <p>{user.name}</p>
                </AvatarGroupTooltip>
              </Avatar>
            )
          )}
        </AvatarGroup>
      </div>

      <div>
        <div className="relative">
          <div className="flex justify-between">
            {timeSlots.map((time, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <div className="text-muted-foreground mb-2 text-sm font-medium">
                  {time}
                </div>
                <div className="bg-accent/50 h-[400px] w-px" />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 mt-4">
            {isWithinWorkHours && (
              <div
                className="bg-primary absolute top-0 bottom-0 z-10 w-0.5"
                style={{ left: `${currentTimePosition}%` }}
              >
                <div className="bg-primary absolute top-0 -left-1 h-2.5 w-2.5 rounded-full" />
              </div>
            )}

            {todayTasks.map((task, index) => {
              const leftPosition = getTimePosition(task.startTime);
              const width = getTaskWidth(task.startTime, task.endTime);
              const verticalPosition = (index % 3) * 30 + 10;

              return (
                <motion.div
                  key={task.id}
                  className="bg-primary/80 absolute min-w-[160px] cursor-pointer rounded-lg border-2 border-transparent p-3 dark:bg-violet-400"
                  style={{
                    left: `${leftPosition}%`,
                    width: `${width}%`,
                    top: `${verticalPosition}%`,
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Link
                    href={PAGES_CONFIG.EDIT_TASK_URL(task.id)}
                    className="h-full"
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-primary ml-[-2px] rounded-lg bg-white p-1.5">
                        <IconDisplay iconName={task.iconName} />
                      </div>
                      <div>
                        <h3 className="font-geist-sans text-sm font-semibold text-white">
                          {task.title}
                        </h3>
                        <p className="text-xs text-white/90">
                          {task.startTime} - {task.endTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
