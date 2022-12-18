import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const authentication = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const [, token] = String(req.headers.authorization).split(" ")

	jwt.verify(token, process.env.SECRET!, (error, payload) => {
		if (error)
			return res.status(401).json({ message: "Você precisa fazer login" })

		return next(payload)
	})
}
