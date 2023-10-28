"use server";
import { cookies } from "next/headers";

export async function setCookie(name, value) {
	const time = 60 * 60 * 24;

	cookies().set({ name: name, value: value, httpOnly: true, path: "/" });
}

export async function getCookie(name) {
	const value = cookies().get(name);

	return value;
}
