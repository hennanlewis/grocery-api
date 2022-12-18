import { Router } from "express"

import { routesErrors } from "../middlewares/routesErrors"
import { authentication } from "../middlewares/authentication"
import CategoriesController from "../controllers/categoriesController"

export const categoriesRoute = Router()

categoriesRoute.get("/categories", CategoriesController.getItem, routesErrors)

categoriesRoute.post(
	"/categories",
	authentication,
	CategoriesController.insertItem,
	routesErrors
)

categoriesRoute.delete(
	"/categories/:id",
	authentication,
	CategoriesController.deleteItem,
	routesErrors
)
