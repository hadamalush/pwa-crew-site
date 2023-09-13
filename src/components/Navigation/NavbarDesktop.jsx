"use client";
import Link from "next/link";
import styles from "../../styles/components/Navigation/NavbarDesktop.module.scss";
import IconRender from "../Icons/IconRender";
import TooltipMenuItems from "../transitions/Tooltips/TooltipMenuItems";
import TooltipMenuItem from "../transitions/Tooltips/TooltipMenuItem";
import { usePathname } from "next/navigation";

const NavbarDesktop = () => {
	const pathname = usePathname();

	const isActive = `${styles["nav__link"]} ${styles["nav__link--isActive"]}`;

	return (
		<nav className={styles["nav"]}>
			<ul className={styles["nav__list"]}>
				<li className={styles["nav__item"]}>
					<Link
						href='/'
						className={pathname === "/" ? isActive : styles["nav__link"]}>
						<IconRender variant='user' />
					</Link>
					<TooltipMenuItems className={styles.tooltip}>
						<TooltipMenuItem href='/zaloguj'>Zaloguj</TooltipMenuItem>
						<TooltipMenuItem href='/'>Zarejestruj</TooltipMenuItem>
					</TooltipMenuItems>
				</li>

				<li className={styles["nav__item"]}>
					<Link
						href='/kolekcja'
						className={
							pathname === "/kolekcja" ? isActive : styles["nav__link"]
						}>
						<IconRender variant='film' />
					</Link>
				</li>

				<li className={styles["nav__item"]}>
					<Link
						href='/wydarzenia'
						className={
							pathname === "/wydarzenia" ? isActive : styles["nav__link"]
						}>
						<IconRender variant='event' />
					</Link>
					<TooltipMenuItems className={styles.tooltip}>
						<TooltipMenuItem href='/'>Utwórz wydarzenie</TooltipMenuItem>
						<TooltipMenuItem href='/'>Pokaż wydarzenia</TooltipMenuItem>
					</TooltipMenuItems>
				</li>

				<li className={styles["nav__item"]}>
					<Link
						href='/faq'
						className={pathname === "/faq" ? isActive : styles["nav__link"]}>
						<IconRender variant='info' />
					</Link>
				</li>

				<li className={styles["nav__item"]}>
					<Link
						href='/ustawienia'
						className={
							pathname === "/ustawienia" ? isActive : styles["nav__link"]
						}>
						<IconRender variant='settings' />
					</Link>
				</li>

				<li className={`${styles["nav__item"]} ${styles["nav__item--bottom"]}`}>
					<Link
						href='/'
						className={`${styles["nav__link"]} ${styles["nav__link--bottom"]}`}>
						<IconRender variant='powerOff' />
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavbarDesktop;
