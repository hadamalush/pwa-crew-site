"use client";
import Link from "next/link";
import IconRender from "../Icons/IconRender";
import NavOptions from "./NavOptions";
import styles from "../../styles/components/Navigation/NavbarMobile.module.scss";
import { useReducer, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { loading } from "@/global/notification-slice";

const eventsReducer = (state, action) => {
	if (action.type === "EVENTS_VISIBLE") {
		return { visible: !state.visible, isAnimation: state.isAnimation };
	} else if (action.type === "EVENTS_ANIMATION") {
		return { visible: state.visible, isAnimation: action.isAnimation };
	} else if (action.type === "EVENTS_UNVISIBLE") {
		return { visible: false, isAnimation: state.isAnimation };
	}
};

const settingsReducer = (state, action) => {
	if (action.type === "SETTINGS_VISIBLE") {
		return { visible: !state.visible, isAnimation: true };
	}
	if (action.type === "SETTINGS_UNVISIBLE") {
		return { visible: !state.visible, isAnimation: false };
	}
};

const NavbarMobile = ({ dict, lang }) => {
	const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
	const [isAnimationQuit, setIsAnimationQuit] = useState(false);
	const dispatch = useDispatch();
	const pathname = usePathname();
	const [eventsState, dispatchEvents] = useReducer(eventsReducer, {
		visible: false,
		isAnimation: false,
	});
	const [settingsState, dispatchSettings] = useReducer(settingsReducer, {
		visible: false,
		isAnimation: false,
	});

	// dispatchSettings({ type: "SETTINGS_VISIBLE" });

	// console.log(settingsState.visible);

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
	console.log(eventsState);

	const showOptionsMenuHandler = (e, variant) => {
		e.preventDefault();

		if (variant === "events" && eventsState.visible) {
			console.log(eventsState);

			dispatchEvents({ type: "EVENTS_ANIMATION", isAnimation: true });

			console.log(eventsState);
			// setIsAnimationQuit(true);

			setTimeout(() => {
				dispatchEvents({ type: "EVENTS_VISIBLE" });
				// setIsOptionsMenuVisible(!isOptionsMenuVisible);
			}, 600);
		} else {
			dispatchEvents({ type: "EVENTS_ANIMATION", isAnimation: false });
			dispatchEvents({ type: "EVENTS_VISIBLE" });
			// setIsAnimationQuit(false);
			// setIsOptionsMenuVisible(!isOptionsMenuVisible);
		}

		// if (isOptionsMenuVisible) {

		// 	setIsAnimationQuit(true);

		// 	setTimeout(() => {
		// 		setIsOptionsMenuVisible(!isOptionsMenuVisible);
		// 	}, 600);

		// } else {
		// 	setIsAnimationQuit(false);
		// 	setIsOptionsMenuVisible(!isOptionsMenuVisible);
		// }
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

	const removeOptionsFromStructureHandler = variant => {
		if (variant === "events") {
			dispatchEvents({ type: "EVENTS_UNVISIBLE" });
		}
		// setIsOptionsMenuVisible(false);
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
						onClick={e => showOptionsMenuHandler(e, "events")}>
						<IconRender variant='calendar' />
						<p>{trl_events}</p>
					</Link>

					{eventsState.visible && (
						<NavOptions
							className={styles["nav__item-options"]}
							animationQuit={eventsState.isAnimation}
							options={optionsEvents}
							onClickCross={() => removeOptionsFromStructureHandler("events")}
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
