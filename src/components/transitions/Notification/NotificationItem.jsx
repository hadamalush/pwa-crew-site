"use client";
import IconRender from "@/components/Icons/IconRender";
import Link from "next/link";
import styles from "../../../styles/components/transitions/Notification/NotificationItem.module.scss";
import { format } from "date-fns";
import { closeModalWithAnimation } from "@/global/modal-slice";
import { useDispatch } from "react-redux";

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
	const dispatch = useDispatch();
	const date = format(new Date(createdDate), " yyyy-MM-dd ");
	const time = format(new Date(createdDate), "HH:mm ");

	const classesLink = href
		? `${styles.notice__link} ${styles["notice__link--hover"]}`
		: styles.notice__link;

	const classesHeading = `${styles["notice__heading"]} ${
		styles[`notice__heading--${action}`]
	}`;
	const classesIcon = `${styles["notice__icon"]} ${
		styles[`notice__icon--${action}`]
	} ${status && styles[`notice__icon--new`]}`;

	const closeModalHandler = () => {
		closeModalWithAnimation(dispatch);
	};

	return (
		<li className={styles.notice}>
			<Link
				href={href ? href : "#"}
				className={classesLink}
				onClick={href && closeModalHandler}>
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
