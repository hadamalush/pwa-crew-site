"use client";

import styles from "../../styles/components/Navigation/NavbarDesktop.module.scss";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavbarDesktop = ({ disc, lang, ...props }) => {
	const { trl_home, trl_events, trl_contact, trl_login, trl_chat } = disc;

	const classes = `${styles.nav} ${props.className}`;
	const { data: session, status } = useSession();
	const eventUrl = lang === "pl" ? "/wydarzenia" : "/events";
	const contactUrl = lang === "pl" ? "/kontakt" : "/contact";
	const loginUrl = lang === "pl" ? "/logowanie" : "/login";
	const router = useRouter();

	console.log(contactUrl);

	const handleEventClick = (path, e) => {
		e.preventDefault();
		router.push(`/${path}`, undefined, { shallow: true });
	};

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
						// onClick={handleEventClick}
						className={styles["nav__list-link"]}>
						{trl_home}
					</Link>
				</li>
				<li>
					<a
						href='/events'
						onClick={e => handleEventClick("wydarzenia", e)}
						className={styles["nav__list-link"]}>
						{trl_events}
					</a>
				</li>

				<li>
					<a
						href={contactUrl}
						onClick={e => handleEventClick("kontakt", e)}
						className={styles["nav__list-link"]}>
						{trl_contact}
					</a>
				</li>
				<li>
					{!session && (
						<Link
							href={loginUrl}
							onClick={e => handleEventClick("logowanie", e)}
							className={styles["nav__list-link"]}>
							{trl_login}
						</Link>
					)}
					{session && (
						<Link href='/' className={styles["nav__list-link"]}>
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
