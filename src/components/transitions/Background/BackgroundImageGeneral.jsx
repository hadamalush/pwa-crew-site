"use client";
import Image from "next/image";
import styles from "./BackgroundImage.module.scss";
import { usePathname } from "next/navigation";

const BackgroundImageGeneral = ({ lang }) => {
	let pathname = usePathname();

	if (pathname.startsWith("/")) {
		pathname = pathname.replace(/^\/+/, "");
	}
	const forgotPasswordPages = pathname.startsWith(`${lang}/forgot-password`);

	const isPath =
		pathname === `${lang}/logowanie` ||
		pathname === `${lang}/rejestracja` ||
		forgotPasswordPages ||
		pathname === `${lang}/kontakt`;

	const classes = !isPath ? styles.hero : `${styles.hero} ${styles.filter}`;

	return (
		<>
			<div className={classes} id='hero'>
				<Image
					alt='Crowd on the concert'
					src='/images/header/concert.jpg'
					priority={true}
					width={0}
					height={0}
					fill
					sizes='100vw'
				/>

				{!isPath && <div className={styles["hero__bg"]}></div>}
			</div>
		</>
	);
};

export default BackgroundImageGeneral;
