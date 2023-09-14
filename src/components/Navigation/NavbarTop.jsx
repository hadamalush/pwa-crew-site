import styles from "../../styles/components/Navigation/NavbarTop.module.scss";
import Link from "next/link";

const NavbarTop = props => {
	const sizeText = { fontSize: props.size + "rem" };
	const classes = `${styles.nav} ${props.className}`;

	return (
		<nav className={classes}>
			<ul className={styles["nav__list"]}>
				<li className={styles["nav__list-item"]}>
					<Link href='/' className={styles["nav__list-link"]} style={sizeText}>
						Home
					</Link>
				</li>
				<li className={styles["nav__list-item"]}>
					<Link href='/' className={styles["nav__list-link"]} style={sizeText}>
						O nas
					</Link>
				</li>
				<li className={styles["nav__list-item"]}>
					<Link href='/' className={styles["nav__list-link"]} style={sizeText}>
						Sklep
					</Link>
				</li>
				<li className={styles["nav__list-item"]}>
					<Link href='/' className={styles["nav__list-link"]} style={sizeText}>
						Kontakt
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavbarTop;
