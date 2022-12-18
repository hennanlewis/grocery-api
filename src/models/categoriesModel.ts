import { ObjectId } from "mongodb"
import { collectionData, selectCollection } from "../config/db"

export const getCategoryItemsModel = async () => {
	const categoriesCollection = selectCollection("categories")
	const categories = await collectionData<CategoryData>(categoriesCollection)
	return categories
}

export const insertCategoryItemModel = async (category: CategoryData) => {
	const categoriesCollection = selectCollection("categories")
	await categoriesCollection.insertOne(category)
	return category
}

export const deleteCategoryItemModel = async (id: string) => {
	const categoriesCollection = selectCollection("categories")
	const result = await categoriesCollection.deleteOne({ _id: new ObjectId(id) })
	const deletedCount = result.deletedCount

	if (deletedCount !== 1) return []

	return { message: "Categoria deletada com sucesso" }
}
