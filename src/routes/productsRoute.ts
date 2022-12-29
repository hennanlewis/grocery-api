import { Router } from "express"

import { routesErrors } from "../middlewares/routesErrors"
import { authentication } from "../middlewares/authentication"
import ProductsController from "../controllers/productsController"

export const productsRoute = Router()

productsRoute.get("/products", ProductsController.getItem, routesErrors)

productsRoute.post(
	"/products",
	authentication,
	ProductsController.insertItem,
	routesErrors
)

productsRoute.get("/products/:id", ProductsController.getItemByID, routesErrors)

productsRoute.put(
	"/products/:id",
	authentication,
	ProductsController.updateItem,
	routesErrors
)

productsRoute.delete(
	"/products/:id",
	authentication,
	ProductsController.deleteItem,
	routesErrors
)
