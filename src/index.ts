import express from "express"
import cors from "cors"
import "dotenv/config"

import { allRoutes } from "./routes/routes"

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())
app.use("/", allRoutes)

app.listen(port, () => {
	console.log("Server is Running on port", port)
})
