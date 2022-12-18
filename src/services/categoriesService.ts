import {
	deleteCategoryItemModel,
	getCategoryItemsModel,
	insertCategoryItemModel,
} from "../models/categoriesModel"
import { hasAnyEmptyValue } from "../validation/hasAnyEmptyValue"
import { isInvalidObject } from "../validation/isInvalidObject"
import { trimObjectValues } from "../validation/trimObjectValues"

export const getCategoryItemsService = () => getCategoryItemsModel()

export const insertCategoryItemsService = async (category: CategoryData) => {
	const keysToCheck = ["name"]
	if (isInvalidObject(category, keysToCheck))
		return Promise.reject(new Error("Insira campos válidos"))

	if (hasAnyEmptyValue(category, keysToCheck))
		return Promise.reject(new Error("Preencha todos os campos"))

	return await insertCategoryItemModel(trimObjectValues(category))
}

export const deleteCategoryItemService = async (id: string) => {
	const result = await deleteCategoryItemModel(id)
	if (String(result) == "") {
		const error = new Error("Categoria não encontrada")
		error.name = "404"
		return Promise.reject(error)
	}

	return result
}
