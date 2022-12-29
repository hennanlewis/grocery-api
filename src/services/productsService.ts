import { errorCreator } from "../helpers/errorCreator"
import {
	getProductsModel,
	insertProductModel,
	deleteProductModel,
	updateProductModel,
} from "../models/productsModel"
import { hasAnyEmptyValue } from "../validation/hasAnyEmptyValue"
import { isInvalidObject } from "../validation/isInvalidObject"
import { trimObjectValues } from "../validation/trimObjectValues"

export const getProducts = () => getProductsModel()

export const getProductsByIDService = async (id: string) => {
	const result = await getProductsModel(id)

	if (String(result) == "")
		return Promise.reject(errorCreator("404", "Produto não encontrado"))

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

export const updateProductService = async (
	productId: string,
	product: ProductsData
) => {
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

	const { matchedCount } = await updateProductModel(productId, productsData)
	if (matchedCount == 0)
		return Promise.reject(errorCreator("404", "Produto não encontrado"))

	return { message: "Produto atualizdao com sucesso" }
}

export const deleteProductService = async (id: string) => {
	const result = await deleteProductModel(id)
	const { acknowledged: wasSuccessfull, deletedCount: deletedCounter } = result

	if (!wasSuccessfull)
		return Promise.reject(new Error("Ocorreu um erro na requisição"))

	if (deletedCounter == 0)
		return Promise.reject(errorCreator("404", "Produto não encontrada"))

	return { message: "Produto deletado com sucesso" }
}
