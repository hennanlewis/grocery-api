import { ObjectId } from "mongodb"

import { selectCollection } from "../config/db"
import { lookupInventorySearch } from "../helpers/lookupInventorySearch"

export const getInventoryItemsModel = async () => {
	const productsCollection = selectCollection("products")

	const agregateSearchOptions = [lookupInventorySearch()]
	const cursor = productsCollection.aggregate<ProductsData>(
		agregateSearchOptions
	)
	const inventory = await cursor.toArray()
	await cursor.close()

	return inventory
}

export const getInventoryItemsByProductModel = async (productId: string) => {
	const productsCollection = selectCollection("products")

	const cursor = productsCollection.aggregate<ProductsData>([
		{ $match: { _id: { $eq: new ObjectId(productId) } } },
		lookupInventorySearch(),
	])
	const inventoryByProductId = await cursor.toArray()
	await cursor.close()

	return inventoryByProductId
}

export const insertInventoryItemModel = async (
	inventoryItem: InventoryData
) => {
	const inventoryCollection = selectCollection("inventory")
	await inventoryCollection.insertOne(inventoryItem)
	return inventoryItem
}

export const deleteInventoryItemModel = async (id: string) => {
	const inventoryCollection = selectCollection("inventory")
	const result = await inventoryCollection.deleteOne({ _id: new ObjectId(id) })
	const deletedCount = result.deletedCount

	if (deletedCount !== 1) return null

	return { message: "Item deletado com sucesso" }
}
