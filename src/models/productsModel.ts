import { ObjectId } from "mongodb"

import { collectionData, selectCollection } from "../config/db"

export const getProductsModel = async (id?: string) => {
	const productsCollection = selectCollection("products")
	return await collectionData<ProductsData>(productsCollection, id)
}

export const insertProductModel = async (product: ProductsData) => {
	const productsCollection = selectCollection("products")
	await productsCollection.insertOne(product)
	return product
}

export const updateProductModel = async (
	productId: string,
	product: ProductsData
) => {
	const productsCollection = selectCollection("products")
	return await productsCollection.updateOne(
		{ _id: new ObjectId(productId) },
		{ $set: { ...product } }
	)
}

export const deleteProductModel = async (id: string) => {
	const productsCollection = selectCollection("products")
	return await productsCollection.deleteOne({ _id: new ObjectId(id) })
}
