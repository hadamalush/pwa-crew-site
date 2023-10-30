"use client";
import Image from "next/image";
import styles from "./BackgroundImage.module.scss";
import { usePathname } from "next/navigation";

const BackgroundImageGeneral = ({ lang }) => {
	let pathname = usePathname();

	if (pathname.startsWith("/")) {
		pathname = pathname.replace(/^\/+/, "");
	}

	const isPath =
		new RegExp(`${lang}/(logowanie|login)`).test(pathname) ||
		new RegExp(`${lang}/(rejestracja|registration)`).test(pathname) ||
		new RegExp(`${lang}/(zapomniane-haslo|forgot-password)`).test(pathname) ||
		new RegExp(`${lang}/(kontakt|contact)`).test(pathname);

	const classes = !isPath ? styles.hero : `${styles.hero} ${styles.filter}`;

	return (
		<div className={classes} id='hero'>
			<Image
				alt='Crowd on the concert'
				src='/images/header/concert.webp'
				priority={true}
				fill
				sizes='100vw'
			/>
			{!isPath && <span className={styles["hero__bg"]}></span>}
		</div>
	);
};

export default BackgroundImageGeneral;
