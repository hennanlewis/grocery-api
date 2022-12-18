import {
	deleteInventoryItemModel,
	getInventoryItemsModel,
	insertInventoryItemModel,
	getInventoryItemsByProductModel,
} from "../models/inventoryModel"
import { hasAnyEmptyValue } from "../validation/hasAnyEmptyValue"
import { isInvalidObject } from "../validation/isInvalidObject"
import { trimObjectValues } from "../validation/trimObjectValues"

export const getInventoryItemsService = () => {
	return getInventoryItemsModel()
}

export const getInventoryItemsByProductIdService = async (
	productId: string
) => {
	const result = await getInventoryItemsByProductModel(productId)

	if (String(result) == "") {
		const error = new Error("Produto não encontrado")
		error.name = "404"
		return Promise.reject(error)
	}

	return result
}

export const insertInventoryItemService = async (
	inventoryItem: InventoryData
) => {
	const keysToCheck = ["productId", "quantity", "price", "purchasePrice"]
	if (isInvalidObject(inventoryItem, keysToCheck))
		return Promise.reject(new Error("Insira campos válidos"))

	if (hasAnyEmptyValue(inventoryItem, keysToCheck))
		return Promise.reject(new Error("Preencha todos os campos"))

	const inventoryItemData: InventoryData = {
		...trimObjectValues(inventoryItem),
		productId: inventoryItem.productId,
		addedAt: new Date(),
	}
	return insertInventoryItemModel(inventoryItemData)
}

export const deleteInventoryItemService = async (id: string) => {
	const result = await deleteInventoryItemModel(id)

	if (!result) {
		const error = new Error("Produto não encontrado")
		error.name = "404"
		return Promise.reject(error)
	}

	return result
}
