"use client";
import Link from "next/link";
import IconRender from "../Icons/IconRender";
import NavOptions from "./NavOptions";
import styles from "../../styles/components/Navigation/NavbarMobile.module.scss";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { loading } from "@/global/notification-slice";

const NavbarMobile = ({ dict, lang }) => {
	const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
	const [isAnimationQuit, setIsAnimationQuit] = useState(false);
	const dispatch = useDispatch();
	const pathname = usePathname();

	const {
		trl_home,
		trl_events,
		trl_contact,
		trl_login,
		trl_chat,
		trl_createEvent,
	} = dict;

	const isActiveEventsPath = new RegExp(
		`${lang}/(events|events/new-event)`
	).test(pathname);

	const isActive = `${styles["nav__link"]} ${styles["nav__link--isActive"]}`;

	const optionsEvents = [
		{
			title: trl_events,
			href: "/events",
			imgSrc: "/images/options/option-events.webp",
		},
		{
			title: trl_createEvent,
			href: "/events/new-event#form",
			imgSrc: "/images/options/option-new-event.webp",
		},
	];

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

	const closeOptionsHandler = path => {
		if (path !== pathname) {
			dispatch(loading(true));
		}

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
		<nav className={styles.nav}>
			<ul className={styles["nav__list"]}>
				<li className={styles["nav__item"]}>
					<Link
						href='/'
						className={pathname === `/${lang}` ? isActive : styles["nav__link"]}
						onClick={() => closeOptionsHandler(`/${lang}`)}>
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
						onClick={() => closeOptionsHandler(`/${lang}`)}>
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
						onClick={() => closeOptionsHandler(`/${lang}/contact`)}>
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
						onClick={() => closeOptionsHandler(`/${lang}/login`)}>
						<IconRender variant='user' />
						<p>{trl_login}</p>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavbarMobile;
