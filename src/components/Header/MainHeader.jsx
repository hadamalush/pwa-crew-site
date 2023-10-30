"use client";
import NavbarDesktop from "../Navigation/NavbarDesktop";
import Logo from "../transitions/Logo/Logo";
import NavbarMobile from "../Navigation/NavbarMobile";
import IconRender from "../Icons/IconRender";
import styles from "../../styles/components/Header/MainHeader.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { loading } from "@/global/notification-slice";
import { useSession } from "next-auth/react";

const MainHeader = ({ dict, lang, ...props }) => {
	// const [isLight, setIsLight] = useState(false);
	const isLoading = useSelector(state => state.notification.isLoading);
	const { data: session } = useSession();
	const dispatch = useDispatch();

	const router = useRouter();
	let pathname = usePathname();

	useEffect(() => {
		dispatch(loading(false));
	}, [pathname]);

	if (pathname.startsWith("/pl") || pathname.startsWith("/en")) {
		pathname = pathname.replace(/^\/(pl|en)/, "");
	}

	const classesHeader = !isLoading
		? `${styles.header}`
		: `${styles.header} ${styles.loading}`;
	const classesGlob = session
		? styles["header__glob"]
		: `${styles["header__glob"]} ${styles["header__glob--right"]} `;
	const classesListLeagueages = session
		? styles["header__leanguages"]
		: `${styles["header__leanguages"]} ${styles["header__leanguages--right"]} `;

	const classesLangIsActive = `${styles["header__leanguages-item"]} ${styles["header__leanguages-item--active"]}`;

	const changeLanguageHandler = async language => {
		dispatch(loading(true));
		const response = await fetch("/api/cookies", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(language),
		});

		if (response.ok) {
			router.refresh();
			router.replace(`/${language}/${pathname}`);
		}
	};

	// const changeThemeHandler = () => {
	// 	setIsLight(!isLight);
	// };

	return (
		<>
			<header className={classesHeader}>
				<Logo className={styles["header__logo"]} />
				<NavbarDesktop
					className={styles["header__nav"]}
					dict={dict}
					lang={lang}
				/>
				<NavbarMobile dict={dict} lang={lang} />
				{/* <IconRender
					variant={isLight ? "moon" : "sun"}
					className={styles["header__theme-switcher"]}
					onClick={changeThemeHandler}
				/> */}
				<IconRender variant='glob' className={classesGlob} />
				<ul className={classesListLeagueages}>
					<li
						className={
							lang === "en"
								? classesLangIsActive
								: styles["header__leanguages-item"]
						}
						onClick={() => changeLanguageHandler("en")}>
						EN
					</li>
					<li
						className={
							lang === "pl"
								? classesLangIsActive
								: styles["header__leanguages-item"]
						}
						onClick={() => changeLanguageHandler("pl")}>
						PL
					</li>
				</ul>
			</header>
			{isLoading && (
				<span
					className={`${styles["header__loading"]} ${styles["rotating-border"]}`}></span>
			)}
		</>
	);
};

export default MainHeader;
