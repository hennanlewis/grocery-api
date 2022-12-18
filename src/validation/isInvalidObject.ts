export const isInvalidObject = <T extends Object>(
	object: T,
	keysToCheck: string[]
) => {
	const objectKeys = Object.keys(object)

	if (objectKeys.length != keysToCheck.length) return true
	for (const keys of keysToCheck) {
		if (!objectKeys.includes(keys)) return true
	}

	return false
}
