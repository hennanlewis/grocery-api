import {
	deleteCartModel,
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

export const deleteCartService = async (
	payload: PayloadData,
	cartItem: CartProductData
) => {
	return await deleteCartModel(payload.email)
}
