import styles from "../../styles/components/Navigation/NavbarDesktop.module.scss";
import IconRender from "../Icons/IconRender";
import Link from "next/link";
import { useSession, signOut, SessionProvider } from "next-auth/react";

const NavbarDesktop = props => {
	const { data: session, status } = useSession();
	const classes = `${styles.nav} ${props.className}`;

	console.log(session);

	const logoutHandler = e => {
		e.preventDefault();

		signOut();
	};

	return (
		<nav className={classes}>
			<ul className={styles["nav__list"]}>
				<li>
					<Link href='/' className={styles["nav__list-link"]}>
						<IconRender variant='home' className={styles["nav__icon"]} />
						Home
					</Link>
				</li>
				<li>
					<Link href='/' className={styles["nav__list-link"]}>
						<IconRender variant='users' className={styles["nav__icon"]} />O nas
					</Link>
				</li>
				<li>
					<Link href='/' className={styles["nav__list-link"]}>
						<IconRender variant='shop' className={styles["nav__icon"]} />
						Sklep
					</Link>
				</li>
				<li>
					<Link href='/' className={styles["nav__list-link"]}>
						<IconRender variant='contact' className={styles["nav__icon"]} />
						Kontakt
					</Link>
				</li>
				<li>
					{!session && (
						<Link href='/logowanie' className={styles["nav__list-link"]}>
							<IconRender variant='user' className={styles["nav__icon"]} />
							Zaloguj
						</Link>
					)}

					{session && status === "authenticated" && (
						<Link
							href='/'
							onClick={logoutHandler}
							className={styles["nav__list-link"]}>
							<IconRender variant='powerOff' className={styles["nav__icon"]} />
							Wyloguj
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default NavbarDesktop;
