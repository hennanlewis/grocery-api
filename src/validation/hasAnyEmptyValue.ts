export const hasAnyEmptyValue = <T extends Object>(
	object: T,
	keysToCheck: string[]
) => {
	for (const item of keysToCheck) {
		if (object[item as keyof typeof object] == "") return true
	}

	return false
}
