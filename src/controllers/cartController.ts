import { NextFunction, Request, Response } from "express"
import {
	deleteCartItemService,
	deleteCartService,
	getCartItemsService,
	updateCartService,
} from "../services/cartService"

const getItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	getCartItemsService(payload)
		.then((data) => res.json(data))
		.catch(next)
}

const updateItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	updateCartService(payload, req.body)
		.then((data) => res.json(data))
		.catch(next)
}

const deleteCart = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	deleteCartService(payload)
		.then((data) => res.json(data))
		.catch(next)
}

const deleteCartItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	deleteCartItemService(payload, req.params.productId)
		.then((data) => res.json(data))
		.catch(next)
}

export default { getItem, updateItem, deleteCart, deleteCartItem }
