import { NextFunction, Request, Response } from "express"

import {
	getInventoryItemsService,
	getInventoryItemsByProductIdService,
	insertInventoryItemService,
	deleteInventoryItemService,
} from "../services/inventoryService"

const getItems = (req: Request, res: Response, next: NextFunction) => {
	getInventoryItemsService()
		.then((data) => res.json(data))
		.catch(next)
}

const getItemByProductId = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	getInventoryItemsByProductIdService(req.params.productId)
		.then((data) => res.json(data))
		.catch(next)
}

const insertItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	insertInventoryItemService(req.body)
		.then((data) => res.status(201).json(data))
		.catch(next)
}

const deleteItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	deleteInventoryItemService(req.params.id)
		.then((data) => res.json(data))
		.catch(next)
}

export default {
	getItems,
	getItemByProductId,
	insertItem,
	deleteItem,
}
