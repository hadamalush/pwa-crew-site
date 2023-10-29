"use client";
import IconRender from "@/components/Icons/IconRender";
import styles from "../../../styles/components/transitions/Notification/NotificationItem.module.scss";
import { format } from "date-fns";
import Link from "next/link";

const NotificationItem = ({
	action,
	actionTextPL,
	actionTextEN,
	title,
	href,
	createdDate,
	status,
	owner,
	lang,
}) => {
	const date = format(new Date(createdDate), " yyyy-MM-dd ");
	const time = format(new Date(createdDate), "HH:mm ");

	const classes = href
		? `${styles.notice} ${styles["notice__hover"]}`
		: styles.notice;

	const classesHeading = `${styles["notice__heading"]} ${
		styles[`notice__heading--${action}`]
	}`;
	const classesIcon = `${styles["notice__icon"]} ${
		styles[`notice__icon--${action}`]
	} ${status && styles[`notice__icon--new`]}`;

	return (
		<li className={classes}>
			<Link href={href} className={styles.notice__link}>
				<div className={styles["notice__content"]}>
					<h3 className={classesHeading}>
						{lang === "en" ? actionTextEN : actionTextPL}
					</h3>
					{title && <p className={styles["notice__text"]}>{title}</p>}
					<time className={styles["notice__date"]}>
						{date}
						<span className={styles["notice__date--time"]}> {time}</span>
					</time>
					<p className={styles["notice__owner"]}>
						{lang === "en" ? "Owner: " : "Właściciel: "}{" "}
						<span className={styles["notice__owner--name"]}>{owner}</span>
					</p>
				</div>
				<IconRender variant={action} className={classesIcon} />
			</Link>
		</li>
	);
};

export default NotificationItem;
