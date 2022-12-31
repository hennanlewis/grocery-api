import { Collection } from "mongodb"

export const updateCart = async (
	cartCollection: Collection,
	updatedCart: CartData,
	email: string
) => {
	await cartCollection.updateOne(
		{ email },
		{ $set: updatedCart },
		{ upsert: true }
	)
	return updatedCart.cartItems
}
