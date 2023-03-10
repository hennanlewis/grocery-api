import { Router } from "express"
import CartsController from "../controllers/cartController"

import { authentication } from "../middlewares/authentication"
import { routesErrors } from "../middlewares/routesErrors"

export const cartRoutes = Router()

cartRoutes.get("/cart", authentication, CartsController.getItem, routesErrors)

cartRoutes.put(
	"/cart",
	authentication,
	CartsController.updateItem,
	routesErrors
)

cartRoutes.delete(
	"/cart",
	authentication,
	CartsController.deleteCart,
	routesErrors
)

cartRoutes.delete(
	"/cart/:productId",
	authentication,
	CartsController.deleteCartItem,
	routesErrors
)
