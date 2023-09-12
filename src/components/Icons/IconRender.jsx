"use client";
import { IconsBase } from "./IconsBase";
import styles from "../../styles/components/transitions/Icons/IconRender.module.scss";

const IconRender = ({ variant }) => {
	const icons = IconsBase();

	const iconsSwitch = variant => {
		switch (variant) {
			case "youtube":
				return icons.youtube;
			case "film":
				return icons.film;
			case "powerOff":
				return icons.powerOff;
			case "settings":
				return icons.settings;
			case "user":
				return icons.user;
			case "event":
				return icons.event;
			case "calendar":
				return icons.calendar;
			case "info":
				return icons.info;
			default:
				return null;
		}
	};

	const selectedIcon = iconsSwitch(variant);

	return <div className={styles.icon}>{selectedIcon}</div>;
};

export default IconRender;
