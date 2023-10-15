import Link from "next/link";
import Avatar from "../transitions/Avatar/Avatar";
import styles from "../../styles/components/Navigation/NavbarDesktop.module.scss";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavDropdown from "./NavDropdown";

const NavbarDesktop = ({ dict, lang, className, ...props }) => {
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

	const { data: session, status } = useSession();
	const pathname = usePathname();
	const isActivePathEvents = new RegExp(
		`${lang}/(events|events/new-event)`
	).test(pathname);

	const logoutHandler = e => {
		e.preventDefault();

		signOut();
	};

	const dropdownItemsEvents = [
		{ title: trl_allEvents, href: "/events" },
		{ title: trl_createEvent, href: "/events/new-event" },
	];

	const dropdownItemsAvatar = [
		{ title: trl_notifications, href: "/" },
		{ title: trl_settings, href: "/" },
		{ title: trl_signOut, href: "/", onClick: logoutHandler },
	];
	return (
		<nav className={classes}>
			<ul className={styles["nav__list"]}>
				<li>
					<Link
						href='/'
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
						className={
							isActivePathEvents ? classesNavItemActive : styles["nav__item"]
						}>
						{trl_events}
					</Link>
					<NavDropdown dropdownItems={dropdownItemsEvents} />
				</li>

				<li>
					<Link
						href='/contact'
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
