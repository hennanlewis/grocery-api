export const errorCreator = (errorCode: string, errorMessage: string) => {
	const error = new Error(errorMessage)
	error.name = errorCode
	return error
}
