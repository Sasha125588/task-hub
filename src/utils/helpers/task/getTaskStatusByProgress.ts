export const getTaskStatusByProgress = (progress: number) => {
	if (progress === 0) {
		return 'not-started'
	} else if (progress === 100) {
		return 'completed'
	} else if (progress > 0) {
		return 'in-progress'
	}

	return 'not-started'
}
