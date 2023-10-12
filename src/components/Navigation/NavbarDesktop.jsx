import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/components/Navigation/NavbarDesktop.module.scss";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const NavbarDesktop = ({ disc, lang, className, ...props }) => {
	const { trl_home, trl_events, trl_contact, trl_login, trl_chat } = disc; //Translation

	const classes = `${styles.nav} ${className || ""}`;
	const classesNavItemActive = `${styles["nav__item"]} ${styles["nav__item--active"]}`;
	const { data: session, status } = useSession();
	const pathname = usePathname();

	const logoutHandler = e => {
		e.preventDefault();

		signOut();
	};

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
							pathname === `/${lang}/events`
								? classesNavItemActive
								: styles["nav__item"]
						}>
						{trl_events}
					</Link>
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
				<>
					<div className={styles["avatar"]}>
						<Image
							src='/images/profil/anonymous.jpg'
							height={50}
							width={50}
							alt='Lama'
							className={styles["avatar__img"]}
						/>
					</div>
					<ul className={styles["avatar__tooltip"]}>
						<li>
							<Link href='/'>Zmień avatar</Link>
						</li>
						<li>
							<Link href='/konto'>Ustawienia konta</Link>
						</li>
						<li>
							<Link href='/' onClick={logoutHandler}>
								Wyloguj
							</Link>
						</li>
					</ul>
				</>
			)}
		</nav>
	);
};

export default NavbarDesktop;
