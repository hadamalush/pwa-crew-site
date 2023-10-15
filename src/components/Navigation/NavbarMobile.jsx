"use client";
import Link from "next/link";
import IconRender from "../Icons/IconRender";
import styles from "../../styles/components/Navigation/NavbarMobile.module.scss";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavOptions from "./NavOptions";

const NavbarMobile = ({ dict, lang }) => {
	const {
		trl_home,
		trl_events,
		trl_contact,
		trl_login,
		trl_chat,
		trl_createEvent,
	} = dict;
	const pathname = usePathname();
	const isActiveEventsPath = new RegExp(
		`${lang}/(events|events/new-event)`
	).test(pathname);

	const isActive = `${styles["nav__link"]} ${styles["nav__link--isActive"]}`;
	const navStyles = `${styles["nav"]} ${styles.isShow}`;

	const [isScrollChange, setIsScrollChange] = useState(false);
	const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
	const [isAnimationQuit, setIsAnimationQuit] = useState(false);

	const optionsEvents = [
		{
			title: trl_events,
			href: "/events",
			imgSrc: "/images/options/option-events.webp",
		},
		{
			title: trl_createEvent,
			href: "/events/new-event",
			imgSrc: "/images/options/option-new-event.webp",
		},
	];

	//Scroll checking

	// useEffect(() => {
	// 	let initScrollValue = window.scrollY;
	// 	window.addEventListener("scroll", () => {
	// 		if (window.scrollY > initScrollValue + 50) {
	// 			initScrollValue = window.scrollY;
	// 			setIsScrollChange(true);
	// 		}
	// 		if (window.scrollY + 50 < initScrollValue) {
	// 			initScrollValue = window.scrollY;
	// 			setIsScrollChange(false);
	// 		}
	// 	});
	// }, []);

	const showOptionsMenuHandler = e => {
		e.preventDefault();

		if (isOptionsMenuVisible) {
			setIsAnimationQuit(true);

			setTimeout(() => {
				setIsOptionsMenuVisible(!isOptionsMenuVisible);
			}, 600);
		} else {
			setIsAnimationQuit(false);
			setIsOptionsMenuVisible(!isOptionsMenuVisible);
		}
	};

	const closeOptionsHandler = () => {
		if (isOptionsMenuVisible) {
			setIsAnimationQuit(true);

			setTimeout(() => {
				setIsOptionsMenuVisible(!isOptionsMenuVisible);
			}, 600);
		}
	};

	const removeOptionsFromStructureHandler = () => {
		setIsOptionsMenuVisible(false);
	};
	return (
		<nav className={!isScrollChange ? styles["nav"] : navStyles}>
			<ul className={styles["nav__list"]}>
				<li className={styles["nav__item"]}>
					<Link
						href='/'
						className={pathname === `/${lang}` ? isActive : styles["nav__link"]}
						onClick={closeOptionsHandler}>
						<IconRender variant='home' />
						<p>{trl_home}</p>
					</Link>
				</li>
				<li className={styles["nav__item"]}>
					<Link
						href='/events'
						className={isActiveEventsPath ? isActive : styles["nav__link"]}
						onClick={showOptionsMenuHandler}>
						<IconRender variant='calendar' />
						<p>{trl_events}</p>
					</Link>

					{isOptionsMenuVisible && (
						<NavOptions
							className={styles["nav__item-options"]}
							animationQuit={isAnimationQuit}
							options={optionsEvents}
							onClickCross={removeOptionsFromStructureHandler}
						/>
					)}
				</li>

				<li className={styles["nav__item"]}>
					<Link
						href='/'
						className={pathname === "/chat" ? isActive : styles["nav__link"]}
						onClick={closeOptionsHandler}>
						<IconRender variant='chat' />
						<p>{trl_chat}</p>
					</Link>
				</li>

				<li className={styles["nav__item"]}>
					<Link
						href='/contact'
						className={
							pathname === `/${lang}/contact` ? isActive : styles["nav__link"]
						}
						onClick={closeOptionsHandler}>
						<IconRender variant='contact' />
						<p>{trl_contact}</p>
					</Link>
				</li>

				<li className={styles["nav__item"]}>
					<Link
						href='/login'
						className={
							pathname === `/${lang}/login` ? isActive : styles["nav__link"]
						}
						onClick={closeOptionsHandler}>
						<IconRender variant='user' />
						<p>{trl_login}</p>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavbarMobile;
