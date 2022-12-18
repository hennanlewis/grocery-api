import bcrypt from "bcrypt"

import { selectCollection } from "../config/db"

export const signinModel = async (email: string, password: string) => {
	const usersCollection = selectCollection("users")
	const user = await usersCollection.findOne<UserData>(
		{ email },
		{ projection: { _id: 0 } }
	)
	if (!user) return null

	const match = await bcrypt.compare(password, user?.password)
	if (!match) return null

	return { email, name: user.name, role: user.role }
}

export const signupModel = async (user: UserData) => {
	const usersCollection = selectCollection("users")
	const hash = await bcrypt.hash(user.password, 10)

	await usersCollection.insertOne({ ...user, password: hash })
	return user
}
