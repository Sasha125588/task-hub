export class TASK_CONFIG {
	static DISPLAYED_TASKS_LIMIT = 6
	static CHANGE_SORT_TYPE_BUTTON_TEXT = {
		frontText: 'Farthest',
		backText: 'Soonest'
	} as const

	static STORAGE_KEYS = {
		SORT_TYPE: 'sortType'
	} as const
}
