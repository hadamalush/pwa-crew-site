"use client";

import NotificationItem from "./NotificationItem";
import styles from "../../../styles/components/transitions/Notification/NotificationList.module.scss";
import { useState } from "react";

const NotificationList = ({ notifications }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [notifiPerPage, setNotifiPerPage] = useState(5);

	const keys = Object.keys(notifications);
	const data = Object.values(notifications);

	const lastNotifiIndex = currentPage * notifiPerPage;
	const firstNotifiIndex = lastNotifiIndex - notifiPerPage;
	const currentsNotifications = data.slice(firstNotifiIndex, lastNotifiIndex);

	let i = 0;

	return (
		<ul className={styles.notifications}>
			<h2 className={styles["notifications__heading"]}>Powiadomienia</h2>
			{currentsNotifications.map(notif => {
				i++;

				return (
					<NotificationItem
						key={keys[i - 1]}
						action={notif.action}
						actionTextPL={notif.action_text_pl}
						actionTextEN={notif.action_text_en}
						title={notif.title}
						href={notif.href}
						createdDate={notif.createdDate}
					/>
				);
			})}
		</ul>
	);
};

export default NotificationList;
