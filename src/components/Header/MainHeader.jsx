"use client";
import NavbarDesktop from "../Navigation/NavbarDesktop";
import Logo from "../transitions/Logo/Logo";
import Image from "next/image";
import styles from "../../styles/components/Header/MainHeader.module.scss";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { logIn } from "@/global/session-slice";

const MainHeader = props => {
	const isLoggedIn = useSelector(state => state.session.isAuth);
	const isLoading = useSelector(state => state.notification.isLoading);
	const dispatch = useDispatch(logIn);
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === "authenticated" && session && !isLoggedIn) {
			dispatch(logIn({ email: session.user, auth: true }));
		}
	}, [session]);

	const isMediumScreen = useMediaQuery({
		query: "(min-width: 768px)",
	});

	const classesHeader = !isLoading
		? `${styles.header}`
		: `${styles.header} ${styles.loading}`;

	return (
		<>
			{isMediumScreen && (
				<header className={classesHeader}>
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
