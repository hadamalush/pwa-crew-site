import styles from "../../styles/components/Navigation/NavbarDesktop.module.scss";
import Link from "next/link";

const NavbarDesktop = props => {
	const classes = `${styles.nav} ${props.className}`;

	return (
		<nav className={classes}>
			<ul className={styles["nav__list"]}>
				<li>
					<Link href='/' className={styles["nav__list-link"]}>
						Home
					</Link>
				</li>
				<li>
					<Link href='/' className={styles["nav__list-link"]}>
						O nas
					</Link>
				</li>
				<li>
					<Link href='/' className={styles["nav__list-link"]}>
						Sklep
					</Link>
				</li>
				<li>
					<Link href='/' className={styles["nav__list-link"]}>
						Kontakt
					</Link>
				</li>
				<li>
					<Link href='/' className={styles["nav__list-link"]}>
						Zaloguj
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavbarDesktop;
