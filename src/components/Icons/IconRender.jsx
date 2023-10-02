"use client";
import { IconsBase } from "./IconsBase";
import styles from "../../styles/components/transitions/Icons/IconRender.module.scss";
/**
 *
 * @param {string} variant - Variants of icons (Available: youtube, film, powerOff, settings, user, event, calendar, info, contact, shop, home, user, users, history, chartRadar, email)
 * @returns icon svg wrapped div
 */
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
			case "contact":
				return icons.contact;
			case "shop":
				return icons.shop;
			case "home":
				return icons.home;
			case "users":
				return icons.users;
			case "history":
				return icons.history;
			case "chartRadar":
				return icons.chartRadar;
			case "friends":
				return icons.friends;
			case "email":
				return icons.email;
			case "location":
				return icons.location;
			case "phone":
				return icons.phone;
			case "x":
				return icons.x;
			case "facebook":
				return icons.facebook;
			case "instagram":
				return icons.instagram;
			case "password":
				return icons.password;
			case "confirmPassword":
				return icons.confirmPassword;
			case "warning":
				return icons.warning;
			case "good":
				return icons.good;
			case "home":
				return icons.home;
			case "chat":
				return icons.chat;
			case "clock":
				return icons.clock;
			case "description":
				return icons.description;
			case "title":
				return icons.title;
			case "town":
				return icons.town;
			case "street":
				return icons.street;
			case "time":
				return icons.time;
			case "date":
				return icons.date;
			case "codePost":
				return icons.codePost;
			case "fileImg":
				return icons.fileImg;
			case "quotes":
				return icons.quotes;
			case "pentagon":
				return icons.pentagon;
			default:
				return null;
		}
	};

	const selectedIcon = iconsSwitch(variant);

	return (
		<div className={classes} style={props.style}>
			{selectedIcon}
		</div>
	);
};

export default IconRender;
