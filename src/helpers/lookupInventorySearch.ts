export const lookupInventorySearch = () => ({
	$lookup: {
		from: "inventory",
		let: { id: { $toString: "$_id" } },
		pipeline: [
			{
				$match: {
					$expr: {
						$and: [{ $eq: ["$productId", "$$id"] }, { $gt: ["$quantity", 0] }],
					},
				},
			},
			{ $project: { addedAt: 0, productId: 0, purchasePrice: 0 } },
		],
		as: "inventory",
	},
})
