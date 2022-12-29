import { ObjectId } from "mongodb"
import { selectCollection } from "../config/db"
import { deleteCartService } from "../services/cartService"

export const getCartItemsModel = async (email: string) => {
	const cartCollection = selectCollection("cart")
	const cart = await cartCollection.findOne<CartProductData>({ email })
	return cart
}

export const updateCartModel = async (
	email: string,
	cartItem: CartProductData
) => {
	const inventoryCollection = selectCollection("inventory")
	const cursor = inventoryCollection
		.aggregate<InventoryData>([
			{
				$lookup: {
					from: "products",
					let: { productId: { $toObjectId: "$productId" } },
					pipeline: [
						{
							$match: {
								$expr: { $eq: ["$_id", "$$productId"] },
							},
						},
						{ $project: { name: 1, _id: 0 } },
					],
					as: "product",
				},
			},
			{
				$group: {
					_id: "$productId",
					productId: { $first: "$productId" },
					quantity: { $sum: "$quantity" },
					price: { $max: "$price" },
					name: { $first: "$product.name" },
				},
			},
			{ $unwind: "$name" },
			{
				$match: {
					$expr: {
						$and: [
							{ $eq: ["$productId", cartItem.productId] },
							{ $gte: ["$quantity", cartItem.quantity] },
							{ $gte: ["$quantity", 0] },
						],
					},
				},
			},
		])
		.project({ _id: 0 })

	const productsToInsert = (await cursor.toArray()) as CartProductData[]

	const cartCollection = selectCollection("cart")
	const cart = await cartCollection.findOne<CartData>({ email })

	let updatedCart = cart
	if (productsToInsert.length < 1) return cart

	const [itemToInsert] = productsToInsert
	if (!cart) {
		updatedCart = { email, cartItems: [{ ...itemToInsert, ...cartItem }] }

		await cartCollection.updateOne(
			{ email },
			{ $set: updatedCart },
			{ upsert: true }
		)
		return updatedCart
	}

	const indexOfProduct = cart.cartItems
		.map((item) => item.productId)
		.indexOf(cartItem.productId)
	if (indexOfProduct >= 0) {
		updatedCart = {
			email,
			cartItems: cart.cartItems.map((arrayItem, index) =>
				index == indexOfProduct ? { ...itemToInsert, ...cartItem } : arrayItem
			),
		}

		await cartCollection.updateOne({ email }, { $set: updatedCart })
		return updatedCart
	}

	updatedCart = {
		email,
		cartItems: [...cart.cartItems, { ...itemToInsert, ...cartItem }],
	}
	await cartCollection.updateOne(
		{ email },
		{ $set: updatedCart },
		{ upsert: true }
	)
	return updatedCart
}

export const deleteCartItemModel = async (email: string, productId: string) => {
	const cartCollection = selectCollection("cart")
	return await cartCollection.updateOne(
		{ email, "cartItems.productId": productId },
		{ $pull: { cartItems: { productId } } }
	)
}

export const deleteCartModel = async (email: string) => {
	const cartCollection = selectCollection("cart")
	return await cartCollection.deleteOne({ email })
}
