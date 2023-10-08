"use client";
import NavbarDesktop from "../Navigation/NavbarDesktop";
import Logo from "../transitions/Logo/Logo";
import NavbarMobile from "../Navigation/NavbarMobile";
import styles from "../../styles/components/Header/MainHeader.module.scss";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const MainHeader = ({ disc, ...props }) => {
	const { data: session, status } = useSession();
	const isLoading = useSelector(state => state.notification.isLoading);

	const classesHeader = !isLoading
		? `${styles.header}`
		: `${styles.header} ${styles.loading}`;

	return (
		<>
			<header className={classesHeader}>
				<Logo className={styles["header__logo"]} />
				<NavbarDesktop className={styles["header__nav"]} disc={disc} />
				<NavbarMobile />
			</header>
		</>
	);
};

export default MainHeader;
