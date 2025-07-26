export const createSearchTerms = (name: string): string => {
	const friendlyName = name
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, str => str.toUpperCase())
		.trim()

	return `${name.toLowerCase()} ${friendlyName.toLowerCase()}`
}
