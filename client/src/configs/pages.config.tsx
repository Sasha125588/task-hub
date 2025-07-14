export class PAGES_CONFIG {
	static SITE_NAME = 'Task Hub'

	static BASE_URL = '/'
	static DASHBOARD_URL = this.BASE_URL + 'dashboard/'
	static MESSAGE_URL = this.BASE_URL + 'message'
	static INSIGHT_URL = this.BASE_URL + 'insight'
	static TEAM_URL = this.BASE_URL + 'team'
	static SCHEDULE_URL = this.BASE_URL + 'schedule'
	static REPORT_URL = this.BASE_URL + 'report'
	static SETTINGS_URL = this.BASE_URL + 'settings'

	static EDIT_TASK_URL = (id: string) => this.DASHBOARD_URL + `/task/${id}/edit`
}
