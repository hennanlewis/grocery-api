import { NextFunction, Request, Response } from "express"

export const routesErrors = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log({ [error.name]: error.message })
	if (error.name == "404")
		return res.status(404).json({ message: error.message })

	res.status(400).json({ message: error.message })
	next()
}
