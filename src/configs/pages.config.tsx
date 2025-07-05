class PagesConfig {
	SITE_NAME = "Task Hub"

	BASE_URL = "/"
	DASHBOARD_URL = this.BASE_URL + "dashboard"
	MESSAGE_URL = this.BASE_URL + "message"
	INSIGHT_URL = this.BASE_URL + "insight"
	TEAM_URL = this.BASE_URL + "team"
	SCHEDULE_URL = this.BASE_URL + "schedule"
	REPORT_URL = this.BASE_URL + "report"
	SETTINGS_URL = this.BASE_URL + "settings"
}

export const PAGES_CONFIG = new PagesConfig()
