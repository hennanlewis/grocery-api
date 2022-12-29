export const hasNoBody = <T extends Object>(object: T) => {
	const qnttOfKeys = Object.keys(object).length
	return qnttOfKeys == 0 ? true : false
}
