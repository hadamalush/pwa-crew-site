import styles from "../../styles/components/Navigation/NavbarDesktop.module.scss";
import IconRender from "../Icons/IconRender";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/global/session-slice";

const NavbarDesktop = props => {
	const classes = `${styles.nav} ${props.className}`;

	const dispatch = useDispatch(logOut);
	const username = useSelector(state => state.session.email);
	const auth = useSelector(state => state.session.isAuth);

	console.log(username, auth);

	const logoutHandler = e => {
		e.preventDefault();

		dispatch(logOut());
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
					{!auth && (
						<Link href='/logowanie' className={styles["nav__list-link"]}>
							<IconRender variant='user' className={styles["nav__icon"]} />
							Zaloguj
						</Link>
					)}

					{auth && (
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
