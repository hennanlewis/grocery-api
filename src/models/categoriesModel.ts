import { ObjectId } from "mongodb"
import { collectionData, selectCollection } from "../config/db"

export const getCategoryItemsModel = async () => {
	const categoriesCollection = selectCollection("categories")
	const categories = await collectionData<CategoryData>(categoriesCollection)
	return categories
}

export const insertCategoryItemModel = async (category: CategoryData) => {
	const categoriesCollection = selectCollection("categories")
	return await categoriesCollection.insertOne(category)
}

export const updateCategoryItemModel = async (
	id: string,
	category: CategoryData
) => {
	const categoriesCollection = selectCollection("categories")
	return await categoriesCollection.updateOne(
		{
			_id: new ObjectId(id),
		},
		{ $set: category }
	)
}

export const deleteCategoryItemModel = async (id: string) => {
	const categoriesCollection = selectCollection("categories")
	return await categoriesCollection.deleteOne({ _id: new ObjectId(id) })
}
