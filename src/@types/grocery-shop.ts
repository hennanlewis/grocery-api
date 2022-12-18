interface ProductsData {
	barcode: string
	image: string[]
	name: string
	description: string
	sizeDetail: string
	category: string
}

interface InventoryData {
	productId: string
	quantity: number
	salePrice: number
	puchasePrice: number
	addedAt: Date
}

interface UserData {
	name: string
	email: string
	password: string
	role: string
}

interface CategoryData {
	name: string
}

interface CartProductData {
	productId: string
	quantity: number
}

interface CartData {
	email: string
	cartItems: CartProductData[]
}

interface PayloadData {
	email: string
	name: string
	iat: number
	exp: number
}
