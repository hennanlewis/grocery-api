import { ObjectId } from "mongodb"

import { collectionData, selectCollection } from "../config/db"

export const getProductsModel = async (id?: string) => {
	const productsCollection = selectCollection("products")
	if ((await productsCollection.countDocuments()) == 0) return null

	const products = await collectionData<ProductsData>(productsCollection, id)

	return products
}

export const insertProductModel = async (product: ProductsData) => {
	const productsCollection = selectCollection("products")
	await productsCollection.insertOne(product)
	return product
}

export const deleteProductModel = async (id: string) => {
	const productsCollection = selectCollection("products")
	const result = await productsCollection.deleteOne({ _id: new ObjectId(id) })
	const deletedCount = result.deletedCount

	if (deletedCount !== 1) return []

	return { message: "Produto deletado com sucesso" }
}
