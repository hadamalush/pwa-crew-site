"use client";
import NavbarDesktop from "../Navigation/NavbarDesktop";
import Logo from "../transitions/Logo/Logo";
import Image from "next/image";
import styles from "../../styles/components/Header/MainHeader.module.scss";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const MainHeader = props => {
	const isLoggedIn = useSelector(state => state.session.isAuth);
	const isMediumScreen = useMediaQuery({
		query: "(min-width: 768px)",
	});

	return (
		<>
			{isMediumScreen && (
				<header className={`${styles.header} ${styles.loading}`}>
					<Logo className={styles["header__logo"]} />
					<NavbarDesktop className={styles["header__nav"]} />
					{isLoggedIn && (
						<Image
							src='/images/header/alpaca.png'
							height={75}
							width={75}
							alt='Lama'
							className={styles["header__avatar"]}
						/>
					)}
				</header>
			)}
		</>
	);
};

export default MainHeader;
