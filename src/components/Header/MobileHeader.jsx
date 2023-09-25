"use client";
import Logo from "../transitions/Logo/Logo";
import NavbarMobile from "../Navigation/NavbarMobile";
import styles from "../../styles/components/Header/MobileHeader.module.scss";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";

const MobileHeader = props => {
	const isLoggedIn = useSelector(state => state.session.isAuth);
	const pathname = usePathname();
	const isLogo = pathname === "/logowanie" || pathname === "/rejestracja";

	const classesBanner = isLogo
		? `${styles.header} ${styles["header__hide-baner"]}`
		: ` ${styles.header}`;

	const classesLogo = isLogo
		? `${styles["header__logo"]} ${styles["header__hide-logo"]}`
		: ` ${styles["header__logo"]}`;

	const isMediumScreen = useMediaQuery({
		query: "(min-width: 768px)",
	});

	return (
		<>
			{!isMediumScreen && (
				<header className={classesBanner}>
					<Logo className={classesLogo} />
					<NavbarMobile />
				</header>
			)}
		</>
	);
};

export default MobileHeader;
