import { errorCreator } from "../helpers/errorCreator"
import {
	deleteCategoryItemModel,
	updateCategoryItemModel,
	getCategoryItemsModel,
	insertCategoryItemModel,
} from "../models/categoriesModel"
import { hasAnyEmptyValue } from "../validation/hasAnyEmptyValue"
import { isInvalidObject } from "../validation/isInvalidObject"
import { trimObjectValues } from "../validation/trimObjectValues"

export const getCategoryService = () => getCategoryItemsModel()

export const insertCategoryService = async (category: CategoryData) => {
	const keysToCheck = ["name"]
	if (isInvalidObject(category, keysToCheck))
		return Promise.reject(new Error("Insira campos válidos"))

	if (hasAnyEmptyValue(category, keysToCheck))
		return Promise.reject(new Error("Preencha todos os campos"))

	await insertCategoryItemModel(trimObjectValues(category))

	return category
}

export const updateCategoryService = async (
	id: string,
	category: CategoryData
) => {
	const keysToCheck = ["name"]
	if (isInvalidObject(category, keysToCheck))
		return Promise.reject(new Error("Insira campos válidos"))

	if (hasAnyEmptyValue(category, keysToCheck))
		return Promise.reject(new Error("Preencha todos os campos"))

	await updateCategoryItemModel(id, category)
	return category
}

export const deleteCategoryService = async (id: string) => {
	const result = await deleteCategoryItemModel(id)
	const { acknowledged: wasSuccessfull, deletedCount: deletedCounter } = result

	if (!wasSuccessfull)
		return Promise.reject(new Error("Ocorreu um erro na requisição"))

	if (deletedCounter == 0)
		return Promise.reject(errorCreator("404", "Categoria não encontrada"))

	return { message: "Categoria deletada com sucesso" }
}
