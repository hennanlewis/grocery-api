import { Collection, MongoClient, ObjectId, WithId } from "mongodb"

const uri = process.env.MONGODB_URI || ""

export const client = new MongoClient(uri)

export const selectCollection = (collectionName: string) =>
	client.db(process.env.MONGODB_NAME).collection(collectionName)

export const collectionData = async <T>(
	collection: Collection,
	id?: string
) => {
	const cursor = id
		? collection.find({ _id: new ObjectId(id) })
		: collection.find()
	const data = await cursor.toArray()
	await cursor.close()

	return data as WithId<T>
}
