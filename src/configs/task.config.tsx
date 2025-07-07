import { PAGES_CONFIG } from "./pages.config"

class TaskConfig {
	DISPLAYED_TASKS_LIMIT = 6
	FLIP_BUTTON_CONFIG = {
		frontText: "Farthest",
		backText: "Soonest"
	} as const

	STORAGE_KEYS = {
		SORT_TYPE: "sortType"
	} as const

	EDIT_TASK_URL = (id: string) =>
		PAGES_CONFIG.DASHBOARD_URL + `/task/${id}/edit`
}

export const TASK_CONFIG = new TaskConfig()
