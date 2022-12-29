import { NextFunction, Request, Response } from "express"

import {
	deleteCategoryService,
	updateCategoryService,
	getCategoryService,
	insertCategoryService,
} from "../services/categoriesService"

const getItem = (req: Request, res: Response, next: NextFunction) => {
	getCategoryService()
		.then((data) => res.json(data))
		.catch(next)
}

const insertItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	insertCategoryService(req.body)
		.then((data) => res.status(201).json(data))
		.catch(next)
}

const updateItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	updateCategoryService(req.params.id, req.body)
		.then((data) => res.status(201).json(data))
		.catch(next)
}

const deleteItem = (
	payload: PayloadData,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	deleteCategoryService(req.params.id)
		.then((data) => res.status(201).json(data))
		.catch(next)
}

export default { getItem, insertItem, updateItem, deleteItem }
