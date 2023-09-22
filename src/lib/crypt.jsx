import { hash, compare } from "bcrypt";

export async function cryptPassword(password) {
	const hashedPassword = await hash(password, 12);

	return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
	const isValid = await compare(password, hashedPassword);

	return isValid;
}
