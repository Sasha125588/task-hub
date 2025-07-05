import { PAGES_CONFIG } from "./pages.config"

class TaskConfig {
	DISPLAYED_TASKS_LIMIT = 6

	EDIT_TASK_URL = (id: string) =>
		PAGES_CONFIG.DASHBOARD_URL + `/task/${id}/edit`
}

export const TASK_CONFIG = new TaskConfig()
