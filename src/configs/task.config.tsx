class TaskConfig {
	DISPLAYED_TASKS_LIMIT = 6
	FLIP_BUTTON_CONFIG = {
		frontText: "Farthest",
		backText: "Soonest"
	} as const

	STORAGE_KEYS = {
		SORT_TYPE: "sortType"
	} as const
}

export const TASK_CONFIG = new TaskConfig()
