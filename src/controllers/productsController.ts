import { NextFunction, Request, Response } from "express"

import {
	getProducts,
	getProductsByIDService,
	insertProductService,
	deleteProductService,
} from "../services/productsService"

const getItem = (req: Request, res: Response, next: NextFunction) => {
	getProducts()
		.then((data) => res.json(data))
		.catch(next)
}

const getItemByID = (req: Request, res: Response, next: NextFunction) => {
	getProductsByIDService(req.params.id)
		.then((data) => res.json(data))
		.catch(next)
}

const insertItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	insertProductService(req.body)
		.then((data) => res.status(201).json(data))
		.catch(next)
}

const deleteItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	deleteProductService(req.params.id)
		.then((data) => res.json(data))
		.catch(next)
}

export default { getItem, getItemByID, insertItem, deleteItem }
