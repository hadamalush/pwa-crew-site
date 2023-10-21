"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default async function Client({ eventModal }) {
	const loginSegments = useSelectedLayoutSegment("eventModal");

	console.log(loginSegments);

	return eventModal;
}
