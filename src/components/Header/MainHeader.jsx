"use client";
import NavbarDesktop from "../Navigation/NavbarDesktop";
import Logo from "../transitions/Logo/Logo";
import Image from "next/image";
import styles from "../../styles/components/Header/MainHeader.module.scss";
import NavbarMobile from "../Navigation/NavbarMobile";
import { useMediaQuery } from "react-responsive";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MainHeader = props => {
	const { data: session, status } = useSession();

	const isMediumScreen = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// const classesHeader = !isLoading
	// 	? `${styles.header}`
	// 	: `${styles.header} ${styles.loading}`;
	const classesHeader = `${styles.header} ${props.className}`;

	return (
		<>
			<header className={classesHeader}>
				<Logo className={styles["header__logo"]} />
				<NavbarDesktop className={styles["header__nav"]} />
				<NavbarMobile />
				{session && (
					<Image
						src='/images/header/alpaca.png'
						height={75}
						width={75}
						alt='Lama'
						className={styles["header__avatar"]}
					/>
				)}
			</header>
		</>
	);
};

export default MainHeader;
