import {
	getProductsModel,
	insertProductModel,
	deleteProductModel,
} from "../models/productsModel"
import { hasAnyEmptyValue } from "../validation/hasAnyEmptyValue"
import { isInvalidObject } from "../validation/isInvalidObject"
import { trimObjectValues } from "../validation/trimObjectValues"

export const getProducts = () => getProductsModel()

export const getProductsByIDService = async (id: string) => {
	const result = await getProductsModel(id)

	if (String(result) == "") {
		const error = new Error("Produto não encontrado")
		error.name = "404"
		return Promise.reject(error)
	}

	return result
}

export const insertProductService = async (product: ProductsData) => {
	if (!product) return Promise.reject(new Error("Insira campos válidos"))

	const keysToCheck = [
		"barcode",
		"name",
		"sizeDetail",
		"category",
		"image",
		"description",
	]
	if (isInvalidObject(product, keysToCheck))
		return Promise.reject(new Error("Insira campos válidos"))

	if (hasAnyEmptyValue(product, keysToCheck))
		return Promise.reject(new Error("Preencha todos os campos"))

	const productsData: ProductsData = { ...trimObjectValues(product) }

	return insertProductModel(productsData)
}

export const deleteProductService = async (id: string) => {
	const result = await deleteProductModel(id)

	if (!result) {
		const error = new Error("Produto não encontrado")
		error.name = "404"
		return Promise.reject(error)
	}

	return result
}
