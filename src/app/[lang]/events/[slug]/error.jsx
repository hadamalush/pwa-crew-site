"use client";

import ErrorHandle from "@/components/Error/Error";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function Error({ error, reset }) {
	const params = useParams();
	const lang = params?.lang;

	const isMediumScreen = useMediaQuery({ minWidth: 768 });

	console.log(isMediumScreen);

	useEffect(() => {
		window.scrollTo({ top: isMediumScreen ? 500 : 550 });
	}, [error]);

	const text =
		lang === "pl"
			? "Wydarzenie prawdopodobnie zostało usunięte przez właściciela."
			: "The event was probably deleted by the owner.";

	const linkPrevious = lang === "pl" ? "Poprzednia strona" : "Previous page";

	return (
		<ErrorHandle
			hSize='h2'
			title={error.message || "Sometsdhing went wrong"}
			text={text}
			linkFirst={linkPrevious}
		/>
	);
}
