"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import React, { useEffect, useState } from "react";
import ModalParallel from "../transitions/Modal/ModalParllel";
import { useRouter } from "next/navigation";

export default function Client({ Edit }) {
	const loginSegments = useSelectedLayoutSegment("edit");
	const router = useRouter();

	const [animation, setAnimation] = useState();
	const visible = loginSegments === "children" ? true : false;

	useEffect(() => {
		if (visible) {
			setAnimation(true);
		}
	}, [visible]);

	const removeModalHandler = () => {
		router.back();
	};

	const returnedComponent = visible && (
		<ModalParallel isVisible={animation} onClose={removeModalHandler}>
			{Edit}
		</ModalParallel>
	);

	return returnedComponent;
}
