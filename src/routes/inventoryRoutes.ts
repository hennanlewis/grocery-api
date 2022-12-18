import { Router } from "express"

import { routesErrors } from "../middlewares/routesErrors"
import { authentication } from "../middlewares/authentication"
import InventoryController from "../controllers/inventoryController"

export const inventoryRoute = Router()

inventoryRoute.get("/inventory", InventoryController.getItems, routesErrors)

inventoryRoute.post(
	"/inventory",
	authentication,
	InventoryController.insertItem,
	routesErrors
)

inventoryRoute.get(
	"/inventory/product/:productId",
	InventoryController.getItemByProductId,
	routesErrors
)

inventoryRoute.delete(
	"/inventory/:id",
	authentication,
	InventoryController.deleteItem,
	routesErrors
)
