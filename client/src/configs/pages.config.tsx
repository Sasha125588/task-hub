class PagesConfig {
  SITE_NAME = "Task Hub";

  BASE_URL = "/";
  DASHBOARD_URL = this.BASE_URL + "dashboard/";
  MESSAGE_URL = this.DASHBOARD_URL + "message";
  INSIGHT_URL = this.DASHBOARD_URL + "insight";
  TEAM_URL = this.DASHBOARD_URL + "team";
  SCHEDULE_URL = this.DASHBOARD_URL + "schedule";
  REPORT_URL = this.DASHBOARD_URL + "report";
  SETTINGS_URL = this.DASHBOARD_URL + "settings";

  EDIT_TASK_URL = (id: string) =>
    PAGES_CONFIG.DASHBOARD_URL + `/task/${id}/edit`;
}

export const PAGES_CONFIG = new PagesConfig();
