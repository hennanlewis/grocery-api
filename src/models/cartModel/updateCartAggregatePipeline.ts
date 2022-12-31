export const updateCartAggregatePipeline = (cartItem: CartProductData) => [
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
			name: { $first: "$product.name" },
			quantity: { $sum: "$quantity" },
			price: { $max: "$price" },
		},
	},
	{ $unwind: "$name" },
	{
		$match: {
			$expr: {
				$and: [
					{ $eq: ["$productId", cartItem.productId] },
					{ $gte: ["$quantity", 0] },
				],
			},
		},
	},
]
