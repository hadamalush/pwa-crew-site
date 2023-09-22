"use client";
import { useSession } from "next-auth/react";

export const sessionChecker = () => {
	const { data: session, status } = useSession({ required: true });

	return { session, status };
};
