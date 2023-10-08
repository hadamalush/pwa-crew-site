"use client";
import Link from "next/link";
import styles from "../../styles/components/Navigation/NavbarMobile.module.scss";
import IconRender from "../Icons/IconRender";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarMobile = () => {
	const pathname = usePathname();
	const [isScrollChange, setIsScrollChange] = useState(false);

	const isActive = `${styles["nav__link"]} ${styles["nav__link--isActive"]}`;
	const navStyles = `${styles["nav"]} ${styles.isShow}`;

	//Scroll checking

	useEffect(() => {
		let initScrollValue = window.scrollY;
		window.addEventListener("scroll", () => {
			if (window.scrollY > initScrollValue + 50) {
				initScrollValue = window.scrollY;
				setIsScrollChange(true);
			}
			if (window.scrollY + 50 < initScrollValue) {
				initScrollValue = window.scrollY;
				setIsScrollChange(false);
			}
		});
	}, []);

	return (
		<nav className={!isScrollChange ? styles["nav"] : navStyles}>
			<ul className={styles["nav__list"]}>
				<li className={styles["nav__item"]}>
					<Link
						href='/'
						className={pathname === "/" ? isActive : styles["nav__link"]}>
						<IconRender variant='home' />
						<p>Start</p>
					</Link>
				</li>

				<li className={styles["nav__item"]}>
					<Link
						href='/kolekcja'
						className={
							pathname === "/kolekcja" ? isActive : styles["nav__link"]
						}>
						<IconRender variant='contact' />
						<p>Kontakt</p>
					</Link>
				</li>

				<li className={styles["nav__item"]}>
					<Link
						href='/ustawienia'
						className={
							pathname === "/ustawienia" ? isActive : styles["nav__link"]
						}>
						<IconRender variant='chat' />
						<p>Chat</p>
					</Link>
				</li>
				<li className={styles["nav__item"]}>
					<Link
						href='/wydarzenia'
						className={
							pathname === "/wydarzenia" ? isActive : styles["nav__link"]
						}>
						<IconRender variant='event' />
						<p>Wydarzenia</p>
					</Link>
				</li>

				<li className={styles["nav__item"]}>
					<Link
						href='/ustawienia'
						className={
							pathname === "/ustawienia" ? isActive : styles["nav__link"]
						}>
						<IconRender variant='user' />
						<p>Konto</p>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavbarMobile;
