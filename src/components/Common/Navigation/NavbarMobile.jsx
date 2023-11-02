"use client";
import Link from "next/link";
import IconRender from "../../transitions/Icons/IconRender";
import NavOptions from "./NavOptions";
import styles from "../../../styles/components/Navigation/NavbarMobile.module.scss";
import { useReducer } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { loading } from "@/global/notification-slice";
import { signOut, useSession } from "next-auth/react";
import { setDataRootModal, setIsVisibleRoot } from "@/global/modal-slice";

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
    return { visible: !state.visible, isAnimation: state.isAnimation };
  } else if (action.type === "SETTINGS_ANIMATION") {
    return { visible: state.visible, isAnimation: action.isAnimation };
  } else if (action.type === "SETTINGS_UNVISIBLE") {
    return { visible: false, isAnimation: state.isAnimation };
  }
};

const NavbarMobile = ({ dict, lang }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [eventsState, dispatchEvents] = useReducer(eventsReducer, {
    visible: false,
    isAnimation: false,
  });
  const [settingsState, dispatchSettings] = useReducer(settingsReducer, {
    visible: false,
    isAnimation: false,
  });

  const {
    trl_home,
    trl_events,
    trl_contact,
    trl_login,
    // trl_chat,
    trl_createEvent,
    trl_notifications,
    trl_settings,
    trl_signOut,
    trl_account,
  } = dict;

  const isActiveEventsPath = new RegExp(`${lang}/(events|events/new-event)`).test(pathname);

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

  const showSettingsHandler = (e) => {
    dispatch(setIsVisibleRoot({ isVisibleRoot: "settingsModal" }));
    dispatch(setDataRootModal({ dataRootModal: true }));
  };

  const showNotificationsHandler = async (e) => {
    let notifications;
    dispatch(setIsVisibleRoot({ isVisibleRoot: "notificationsModal" }));

    try {
      const response = await fetch("/api/getNotifications");

      const data = await response.json();

      notifications = data?.notifications;
    } catch (err) {
      console.log(err);
    }

    dispatch(
      setDataRootModal({
        dataRootModal: notifications,
      })
    );
  };

  const optionsSettings = [
    {
      title: trl_notifications,
      href: "/notifications",
      imgSrc: "/images/options/option-notifications.webp",
      onClick: (e) => {
        e.preventDefault();
        showNotificationsHandler();
      },
    },
    {
      title: trl_signOut,
      href: "/",
      imgSrc: "/images/options/option-signout.webp",
      onClick: signOut,
    },
    {
      title: trl_settings,
      href: "/settings",
      imgSrc: "/images/options/option-settings.webp",
      onClick: (e) => {
        e.preventDefault();
        showSettingsHandler();
      },
    },
  ];

  const showOptionsMenuHandler = (e, variant) => {
    e.preventDefault();

    if (variant === "events" && eventsState.visible) {
      dispatchEvents({ type: "EVENTS_ANIMATION", isAnimation: true });

      setTimeout(() => {
        dispatchEvents({ type: "EVENTS_VISIBLE" });
      }, 600);
    } else if (variant === "settings" && settingsState.visible) {
      dispatchSettings({ type: "SETTINGS_ANIMATION", isAnimation: true });

      setTimeout(() => {
        dispatchSettings({ type: "SETTINGS_VISIBLE" });
      }, 600);
    } else {
      if (variant === "events") {
        dispatchEvents({ type: "EVENTS_ANIMATION", isAnimation: false });
        dispatchEvents({ type: "EVENTS_VISIBLE" });
      } else {
        dispatchSettings({ type: "SETTINGS_ANIMATION", isAnimation: false });
        dispatchSettings({ type: "SETTINGS_VISIBLE" });
      }
    }
  };

  const closeOptionsHandler = (path) => {
    if (path !== pathname) {
      dispatch(loading(true));
    }

    if (eventsState.visible) {
      dispatchEvents({ type: "EVENTS_ANIMATION", isAnimation: true });

      setTimeout(() => {
        dispatchEvents({ type: "EVENTS_VISIBLE" });
      }, 600);
    }

    if (settingsState.visible) {
      dispatchSettings({ type: "SETTINGS_ANIMATION", isAnimation: true });

      setTimeout(() => {
        dispatchSettings({ type: "SETTINGS_VISIBLE" });
      }, 600);
    }
  };

  const removeOptionsFromStructureHandler = (variant) => {
    if (variant === "events") {
      dispatchEvents({ type: "EVENTS_UNVISIBLE" });
    }

    if (variant === "settings") {
      dispatchSettings({ type: "SETTINGS_UNVISIBLE" });
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles["nav__list"]}>
        <li className={styles["nav__item"]}>
          <Link
            href="/"
            className={pathname === `/${lang}` ? isActive : styles["nav__link"]}
            onClick={() => closeOptionsHandler(`/${lang}`)}
          >
            <IconRender variant="home" />
            <p>{trl_home}</p>
          </Link>
        </li>
        <li className={styles["nav__item"]}>
          <Link
            href={settingsState.visible ? "#" : "/events"}
            className={isActiveEventsPath ? isActive : styles["nav__link"]}
            onClick={settingsState.visible ? null : (e) => showOptionsMenuHandler(e, "events")}
          >
            <IconRender variant="calendar" />
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

        {/* <li className={styles["nav__item"]}>
					<Link
						href='/'
						className={pathname === "/chat" ? isActive : styles["nav__link"]}
						onClick={() => closeOptionsHandler(`/${lang}`)}>
						<IconRender variant='chat' />
						<p>{trl_chat}</p>
					</Link>
				</li> */}

        <li className={styles["nav__item"]}>
          <Link
            href="/contact"
            className={pathname === `/${lang}/contact` ? isActive : styles["nav__link"]}
            onClick={() => closeOptionsHandler(`/${lang}/contact`)}
          >
            <IconRender variant="contact" />
            <p>{trl_contact}</p>
          </Link>
        </li>

        <li className={styles["nav__item"]}>
          <Link
            href={eventsState.visible ? "#" : "/login"}
            className={pathname === `/${lang}/login` ? isActive : styles["nav__link"]}
            onClick={
              eventsState.visible || !session ? null : (e) => showOptionsMenuHandler(e, "settings")
            }
          >
            <IconRender variant="user" />
            <p>{session ? trl_account : trl_login}</p>
          </Link>

          {settingsState.visible && (
            <NavOptions
              className={styles["nav__item-options"]}
              animationQuit={settingsState.isAnimation}
              options={optionsSettings}
              onClickCross={() => removeOptionsFromStructureHandler("settings")}
            />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavbarMobile;
