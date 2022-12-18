import jwt from "jsonwebtoken"

import { signinModel, signupModel } from "../models/usersModel"
import { hasAnyEmptyValue } from "../validation/hasAnyEmptyValue"
import { isInvalidObject } from "../validation/isInvalidObject"

interface SignupUserData extends UserData {
	confirmPassword: string
}

export const signinService = async (email: string, password: string) => {
	const result = await signinModel(email, password)
	if (!result) return Promise.reject(new Error("Usuário ou senha inválidos"))

	const token = jwt.sign(result, process.env.SECRET!, {
		expiresIn: 60 * 60,
	})

	return { token }
}

export const signupService = async (user: SignupUserData) => {
	const { name, email, password, confirmPassword } = user

	const keysToCheck = ["name", "email", "password", "confirmPassword"]
	if (isInvalidObject(user, keysToCheck))
		return Promise.reject(new Error("Insira campos válidos"))

	if (hasAnyEmptyValue(user, keysToCheck))
		return Promise.reject(new Error("Preencha os campos obrigatórios"))

	if (password != confirmPassword)
		return Promise.reject(new Error("Senhas não conferem"))

	const role = "comum"
	await signupModel({ name, email, password, role })

	return { name, email }
}
