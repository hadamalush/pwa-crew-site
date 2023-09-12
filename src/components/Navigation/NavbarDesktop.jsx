"use client";
import Link from "next/link";
import styles from "../../styles/components/Navigation/NavbarDesktop.module.scss";
import IconRender from "../Icons/IconRender";
import TooltipMenuItems from "../transitions/Tooltips/TooltipMenuItems";
import TooltipMenuItem from "../transitions/Tooltips/TooltipMenuItem";
import { usePathname } from "next/navigation";

const NavbarDesktop = () => {
	const pathname = usePathname();

	return (
		<nav className={styles["nav"]}>
			<ul className={styles["nav__list"]}>
				<li className={styles["nav__item"]}>
					<Link href='/admin' className={styles["nav__link"]}>
						<IconRender variant='user' />
					</Link>
					<TooltipMenuItems className={styles.tooltip}>
						<TooltipMenuItem href='/'>Zaloguj</TooltipMenuItem>
						<TooltipMenuItem href='/'>Zarejestruj</TooltipMenuItem>
					</TooltipMenuItems>
				</li>

				<li className={styles["nav__item"]}>
					<Link href='/' className={styles["nav__link"]}>
						<IconRender variant='film' />
					</Link>
				</li>

				<li className={styles["nav__item"]}>
					<Link href='/' className={styles["nav__link"]}>
						<IconRender variant='event' />
					</Link>
					<TooltipMenuItems className={styles.tooltip}>
						<TooltipMenuItem href='/'>Utwórz wydarzenie</TooltipMenuItem>
						<TooltipMenuItem href='/'>Pokaż wydarzenia</TooltipMenuItem>
					</TooltipMenuItems>
				</li>

				<li className={styles["nav__item"]}>
					<Link href='/' className={styles["nav__link"]}>
						<IconRender variant='info' />
					</Link>
				</li>

				<li className={styles["nav__item"]}>
					<Link href='/' className={styles["nav__link"]}>
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
