"use client";
import IconRender from "@/components/Icons/IconRender";
import styles from "../../../styles/components/transitions/Notification/NotificationItem.module.scss";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setDataModal, setIsVisible } from "@/global/modal-slice";

const NotificationItem = ({
	action,
	actionTextPL,
	actionTextEN,
	title,
	href,
	createdDate,
}) => {
	const lang = "en";

	const date = format(new Date(createdDate), "yyyy-MM-dd");
	const router = useRouter();
	const dispatch = useDispatch();

	const classes = href
		? `${styles.notice} ${styles["notice__hover"]}`
		: styles.notice;

	const classesHeading = `${styles["notice__heading"]} ${
		styles[`notice__heading--${action}`]
	}`;
	const classesIcon = `${styles["notice__icon"]} ${
		styles[`notice__icon--${action}`]
	}`;

	const changePageHandler = () => {
		if (href) {
			dispatch(setIsVisible({ isVisible: "close-no-refresh" }));
			setTimeout(() => {
				router.push(href);
			}, 1000);
		}
	};

	return (
		<li className={classes} onClick={event => changePageHandler(event)}>
			<div className={styles["notice__content"]}>
				<h3 className={classesHeading}>
					{lang === "en" ? actionTextEN : actionTextPL}
				</h3>
				{title && <p className={styles["notice__text"]}>{title}</p>}
				<time className={styles["notice__date"]}>{date}</time>
			</div>
			<IconRender variant={action} className={classesIcon} />
		</li>
	);
};

export default NotificationItem;
