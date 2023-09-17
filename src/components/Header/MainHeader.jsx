"use client";
import styles from "../../styles/components/Header/MainHeader.module.scss";
import Logo from "../transitions/Logo/Logo";
import NavbarDesktop from "../Navigation/NavbarDesktop";
import NavbarMobile from "../Navigation/NavbarMobile";

const MainHeader = props => {
	console.log("ladowanie");
	return (
		<header className={styles.header}>
			<Logo className={styles["header__logo"]} />
			<NavbarDesktop className={styles["header__nav"]} />
			<NavbarMobile />
		</header>
	);
};

export default MainHeader;
