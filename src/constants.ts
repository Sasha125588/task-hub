export const SITE_NAME = "Task Hub"

export const BASE_URL = "/"
export const DASHBOARD_URL = BASE_URL + "dashboard"
export const MESSAGE_URL = BASE_URL + "message"
export const INSIGHT_URL = BASE_URL + "insight"
export const TEAM_URL = BASE_URL + "team"
export const SCHEDULE_URL = BASE_URL + "schedule"
export const REPORT_URL = BASE_URL + "report"
export const SETTINGS_URL = BASE_URL + "settings"

export const EDIT_TASK_URL = (id: string) => DASHBOARD_URL + `/task/${id}/edit`

export const DISPLAYED_TASKS_LIMIT = 6
