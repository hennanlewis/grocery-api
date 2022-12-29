import { errorCreator } from "../helpers/errorCreator"
import {
	deleteCartModel,
	deleteCartItemModel,
	getCartItemsModel,
	updateCartModel,
} from "../models/cartModel"
import { hasAnyEmptyValue } from "../validation/hasAnyEmptyValue"
import { isInvalidObject } from "../validation/isInvalidObject"

export const getCartItemsService = async (payload: PayloadData) => {
	const cart = await getCartItemsModel(payload.email)
	if (!cart) return []

	return cart
}

export const updateCartService = async (
	payload: PayloadData,
	cartItem: CartProductData
) => {
	const keysToCheck = ["productId", "quantity"]
	if (isInvalidObject(cartItem, keysToCheck))
		return Promise.reject(new Error("Insira campos válidos"))

	if (hasAnyEmptyValue(cartItem, keysToCheck))
		return Promise.reject(new Error("Preencha todos os campos"))

	return await updateCartModel(payload.email, cartItem)
}

export const deleteCartService = async (payload: PayloadData) => {
	const result = await deleteCartModel(payload.email)
	const { acknowledged: isSuccessfull, deletedCount: deletedCounter } = result

	if (!isSuccessfull)
		return Promise.reject(new Error("Ocorreu um erro na requisição"))

	if (deletedCounter == 0)
		return Promise.reject(errorCreator("404", "carrinho não encontrado"))

	return { message: "Carrinho limpo com sucesso" }
}

export const deleteCartItemService = async (
	payload: PayloadData,
	productId: string
) => {
	const result = await deleteCartItemModel(payload.email, productId)
	const { matchedCount } = result

	if (matchedCount == 0)
		return Promise.reject(errorCreator("404", "Produto não encontrado"))

	return { message: "Produto removido com sucesso" }
}
