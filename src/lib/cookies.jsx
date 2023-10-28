"use server";
import { cookies } from "next/headers";

export async function setCookie(name, value) {
	const time = 60 * 60 * 24;

	cookies().set(name, value, { maxAge: time });
}
