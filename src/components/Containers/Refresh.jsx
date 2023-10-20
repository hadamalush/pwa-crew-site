"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Refresh() {
	const pathname = usePathname();

	// useEffect(() => {
	// 	if (pathname === "/api/events") {
	// 	}
	// }, [pathname]);

	return null;
}
