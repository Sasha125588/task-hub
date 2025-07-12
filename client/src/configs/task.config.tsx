class TaskConfig {
  DISPLAYED_TASKS_LIMIT = 6;
  CHANGE_SORT_TYPE_BUTTON_TEXT = {
    frontText: "Farthest",
    backText: "Soonest",
  } as const;

  STORAGE_KEYS = {
    SORT_TYPE: "sortType",
  } as const;
}

export const TASK_CONFIG = new TaskConfig();
