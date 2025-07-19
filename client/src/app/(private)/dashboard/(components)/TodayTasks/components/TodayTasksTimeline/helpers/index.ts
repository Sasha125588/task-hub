export const getTimePosition = (time?: string) => {
	if (!time) return 0
	const [hours, minutes] = time.split(':').map(Number)
	const totalMinutes = hours * 60 + minutes
	const startMinutes = 9 * 60 // начало рабочег дня
	const endMinutes = 17 * 60 // конец рабочего дня
	const allMinutes = endMinutes - startMinutes

	return ((totalMinutes - startMinutes) / allMinutes) * 100
}

export const getTaskWidth = (startTime?: string, endTime?: string) => {
	if (!startTime || !endTime) return 20
	const start = getTimePosition(startTime)
	const end = getTimePosition(endTime)
	return end - start
}

export const getCurrentTimePosition = () => {
	const now = new Date()
	const hours = now.getHours()
	const minutes = now.getMinutes()
	return getTimePosition(`${hours}:${minutes}`)
}
