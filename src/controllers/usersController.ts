import { NextFunction, Request, Response } from "express"

import { signinService, signupService } from "../services/usersService"

const signin = (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body
	signinService(email, password)
		.then((data) => res.json(data))
		.catch(next)
}

const signup = (req: Request, res: Response, next: NextFunction) => {
	signupService(req.body)
		.then((data) => res.status(201).json(data))
		.catch(next)
}

export default { signin, signup }
