import styles from "../../styles/components/Navigation/NavbarDesktop.module.scss";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const NavbarDesktop = props => {
	const classes = `${styles.nav} ${props.className}`;
	const { data: session, status } = useSession();

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
						Home
					</Link>
				</li>
				<li>
					<Link href='/wydarzenia' className={styles["nav__list-link"]}>
						Wydarzenia
					</Link>
				</li>

				<li>
					<Link href='/' className={styles["nav__list-link"]}>
						Kontakt
					</Link>
				</li>
				<li>
					{!session && (
						<Link href='/logowanie' className={styles["nav__list-link"]}>
							Zaloguj
						</Link>
					)}
					{session && (
						<Link href='/' className={styles["nav__list-link"]}>
							Chat
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
