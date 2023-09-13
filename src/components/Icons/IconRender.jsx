"use client";
import { IconsBase } from "./IconsBase";
import styles from "../../styles/components/transitions/Icons/IconRender.module.scss";

const IconRender = props => {
	const icons = IconsBase();
	const variant = props.variant;
	const classes = `${styles.icon} ${props.className}`;

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
			case "logo":
				return icons.logo;
			default:
				return null;
		}
	};

	const selectedIcon = iconsSwitch(variant);

	return <div className={classes}>{selectedIcon}</div>;
};

export default IconRender;
