export const trimObjectValues = <T extends Object>(object: T) => {
	const keys = Object.keys(object)
	const values = Object.values(object)
	let result = {} as T

	keys.forEach((item, index) => {
		result = { ...result, [item]: values[index] }
	})

	return result
}
