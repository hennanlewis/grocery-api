import { collectionData, selectCollection } from "../../config/db"
import { updateCart } from "./updateCart"
import { updateCartAggregatePipeline } from "./updateCartAggregatePipeline"

export const getCartItemsModel = async (email: string) => {
	const cartCollection = selectCollection("cart")
	return await cartCollection.findOne<CartProductData>({ email })
}

export const updateCartModel = async (
	email: string,
	cartItem: CartProductData
) => {
	const inventoryCollection = selectCollection("inventory")
	const cursor = inventoryCollection
		.aggregate<InventoryData>(updateCartAggregatePipeline(cartItem))
		.project({ _id: 0, email: 0 })

	const productsToInsert = (await cursor.toArray()) as CartProductData[]

	const cartCollection = selectCollection("cart")
	const cart = await cartCollection.findOne<CartData>(
		{ email },
		{ projection: { _id: 0, email: 0 } }
	)
	const [inventoryItem] = productsToInsert
	if (!inventoryItem) return cart?.cartItems || []

	const itemToInsert = {
		...inventoryItem,
		quantity: Math.min(inventoryItem.quantity, cartItem.quantity),
	}

	if (!cart) {
		const updatedCart = { email, cartItems: [itemToInsert] } as CartData
		return await updateCart(cartCollection, updatedCart, email)
	}

	const itemIndexToUpdate = cart.cartItems.filter(
		(item) => item.productId == itemToInsert.productId
	)

	if (itemIndexToUpdate.length == 0) {
		const cartItems = [...cart.cartItems, itemToInsert]
		const updatedCart = { email, cartItems } as CartData
		return await updateCart(cartCollection, updatedCart, email)
	}

	const cartItems = cart.cartItems.map((product) =>
		product.productId == itemToInsert.productId ? itemToInsert : product
	)
	const updatedCart = { email, cartItems } as CartData
	return await updateCart(cartCollection, updatedCart, email)
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
