import express, { Request, Response, Router } from "express"
import { cartRoutes } from "./cartRoutes"

import { categoriesRoute } from "./categoriesRoutes"
import { inventoryRoute } from "./inventoryRoutes"
import { productsRoute } from "./productsRoute"
import { usersRoute } from "./usersRoutes"

export const allRoutes = express()

export const indexRoute = Router()

indexRoute.get("/", (req: Request, res: Response) =>
	res.send("Index API route")
)

allRoutes.use("/", categoriesRoute)
allRoutes.use("/", productsRoute)
allRoutes.use("/", inventoryRoute)
allRoutes.use("/", usersRoute)
allRoutes.use("/", cartRoutes)
