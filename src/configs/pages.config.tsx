export class PAGES_CONFIG {
	static SITE_NAME = 'Task Hub'

	static BASE_URL = '/'
	static DASHBOARD_URL = this.BASE_URL + 'dashboard'
	static MESSAGE_URL = this.BASE_URL + 'message'
	static INSIGHTS_URL = this.BASE_URL + 'insights'
	static TEAM_URL = this.BASE_URL + 'team'
	static SCHEDULE_URL = this.BASE_URL + 'schedule'
	static REPORTS_URL = this.BASE_URL + 'reports'
	static SETTINGS_URL = this.BASE_URL + 'settings'

	static EDIT_TASK_URL = (id: string) => this.DASHBOARD_URL + `/task/${id}`
}
