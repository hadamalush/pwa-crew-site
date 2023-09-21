"use client";
import Image from "next/image";
import styles from "./BackgroundImage.module.scss";
import { usePathname } from "next/navigation";

import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useEffect } from "react";

const BackgroundImageGeneral = () => {
	let pathname = usePathname();
	const [style1, setStyle1] = useState({});

	const isMediumScreen = useMediaQuery({
		query: "(max-width: 768px)",
	});

	if (pathname.startsWith("/")) {
		pathname = pathname.replace(/^\/+/, "");
	}

	const isPath = pathname === "logowanie" || pathname === "rejestracja";

	const style = {
		logowanie: {
			height: "100vh",
			minHeight: "100rem",
		},
		rejestracja: {
			height: "100vh",
			minHeight: "100rem",
		},
	};

	useEffect(() => {
		const checkPoints = async () => {
			const hero = document.getElementById("hero");

			if (isPath && isMediumScreen) {
				style[pathname].display = "none";
				setStyle1(style[pathname]);
			} else if (isPath) {
				setStyle1(style[pathname]);
				hero.classList.add(styles.filter);
			} else if (!isPath) {
				setStyle1(null);
				hero.classList.remove(styles.filter);
			}

			return;
		};

		checkPoints();
	}, [isMediumScreen, pathname]);

	return (
		<div className={styles.hero} style={style1} id='hero'>
			{/* {isShow && ( */}
			<Image
				alt='Crowd on the concert'
				src='/images/header/concert.jpg'
				priority={true}
				width={0}
				height={0}
				fill
				sizes='100vw'
			/>
			{/* )} */}
			{!isPath && <div className={styles["hero__bg"]}></div>}
		</div>
	);
};

export default BackgroundImageGeneral;
