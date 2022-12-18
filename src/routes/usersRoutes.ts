import { Router } from "express"

import UserController from "../controllers/usersController"
import { routesErrors } from "../middlewares/routesErrors"

export const usersRoute = Router()

usersRoute.post("/signin", UserController.signin, routesErrors)
usersRoute.post("/signup", UserController.signup, routesErrors)
