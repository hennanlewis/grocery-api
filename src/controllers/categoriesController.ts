import { NextFunction, Request, Response } from "express"

import {
	deleteCategoryItemService,
	getCategoryItemsService,
	insertCategoryItemsService,
} from "../services/categoriesService"

const getItem = (req: Request, res: Response, next: NextFunction) => {
	getCategoryItemsService()
		.then((data) => res.json(data))
		.catch(next)
}

const insertItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	insertCategoryItemsService(req.body)
		.then((data) => res.status(201).json(data))
		.catch(next)
}

const deleteItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	deleteCategoryItemService(req.params.id)
		.then((data) => res.status(201).json(data))
		.catch(next)
}

export default { getItem, insertItem, deleteItem }
