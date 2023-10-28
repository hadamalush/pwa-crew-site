import Link from "next/link";
import Avatar from "../transitions/Avatar/Avatar";
import NavDropdown from "./NavDropdown";
import styles from "../../styles/components/Navigation/NavbarDesktop.module.scss";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { loading } from "@/global/notification-slice";
import { getCookie } from "@/lib/cookies";

const NavbarDesktop = ({ dict, lang, className, ...props }) => {
	const { data: session, status } = useSession();
	const pathname = usePathname();
	const dispatch = useDispatch();

	const {
		trl_home,
		trl_events,
		trl_contact,
		trl_login,
		trl_chat,
		trl_allEvents,
		trl_createEvent,
		trl_notifications,
		trl_settings,
		trl_signOut,
	} = dict;

	const classes = `${styles.nav} ${className || ""}`;
	const classesNavItemActive = `${styles["nav__item"]} ${styles["nav__item--active"]}`;

	// useEffect(() => {
	// 	let isCheck;
	// 	let dateNotices;

	// 	(async () => {
	// 		dateNotices = await getCookie("dateNotices");
	// 		const newNotices = await getCookie("newNotices");
	// 		setQuantityNewNotices(newNotices?.value);

	// 		if (dateNotices) {
	// 			const currentDate = new Date();
	// 			isCheck = currentDate > new Date(dateNotices.value).getTime() + 600000;
	// 		}
	// 	})().then(async () => {
	// 		if ((email && isCheck) || !dateNotices) {
	// 			const apiUrl = `/api/getStatusNotifications?email=${email || null}`;
	// 			let result;

	// 			try {
	// 				const response = await fetch(apiUrl);

	// 				if (response.ok) {
	// 					result = await response.json();
	// 				}
	// 			} catch (err) {
	// 				return;
	// 			}

	// 			setCookie("newNotices", result?.message);
	// 			setCookie("dateNotices", new Date());
	// 		}
	// 	});
	// }, [pathname]);

	const isActivePathEvents = new RegExp(
		`${lang}/(events|events/new-event)`
	).test(pathname);

	const logoutHandler = e => {
		e.preventDefault();

		signOut();
	};

	const animationHandler = path => {
		if (path !== pathname) {
			dispatch(loading(true));
		}
	};

	const dropdownItemsEvents = [
		{
			title: trl_allEvents,
			href: "/events",
			onClick: () => animationHandler(`/${lang}/events`),
		},
		{
			title: trl_createEvent,
			href: "/events/new-event",
			onClick: () => animationHandler(`/${lang}/events/new-event`),
		},
	];

	const dropdownItemsAvatar = [
		{ title: trl_notifications, href: "/notifications" },
		{ title: trl_settings, href: "/" },
		{ title: trl_signOut, href: "/", onClick: logoutHandler },
	];

	return (
		<nav className={classes}>
			<ul className={styles["nav__list"]}>
				<li>
					<Link
						href='/'
						onClick={() => animationHandler(`/${lang}`)}
						className={
							pathname === `/${lang}`
								? classesNavItemActive
								: styles["nav__item"]
						}>
						{trl_home}
					</Link>
				</li>
				<li>
					<Link
						href='/events'
						onClick={() => animationHandler(`/${lang}/events`)}
						className={
							isActivePathEvents ? classesNavItemActive : styles["nav__item"]
						}>
						{trl_events}
					</Link>
					<NavDropdown
						dropdownItems={dropdownItemsEvents}
						loading={animationHandler}
					/>
				</li>

				<li>
					<Link
						href='/contact'
						onClick={() => animationHandler(`/${lang}/contact`)}
						className={
							pathname === `/${lang}/contact`
								? classesNavItemActive
								: styles["nav__item"]
						}>
						{trl_contact}
					</Link>
				</li>
				<li>
					{!session && (
						<Link
							href='/login'
							onClick={() => animationHandler(`/${lang}/login`)}
							className={
								pathname === `/${lang}/login`
									? classesNavItemActive
									: styles["nav__item"]
							}>
							{trl_login}
						</Link>
					)}
					{session && (
						<Link href='/' className={styles["nav__item"]}>
							{trl_chat}
						</Link>
					)}
				</li>
			</ul>

			{session && (
				<Avatar className={styles["avatar"]}>
					<NavDropdown
						className={styles["avatar__dropdown"]}
						dropdownItems={dropdownItemsAvatar}
					/>
				</Avatar>
			)}
		</nav>
	);
};

export default NavbarDesktop;
