"use client";

import NotificationItem from "./NotificationItem";
import styles from "../../../styles/components/transitions/Notification/NotificationList.module.scss";
import { useState } from "react";

const NotificationList = ({ notifications }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [notifiPerPage, setNotifiPerPage] = useState(2);

	const keys = Object.keys(notifications);
	const allNotices = Object.values(notifications);
	const maxPage = Math.ceil(allNotices.length / notifiPerPage);

	console.log(maxPage);

	const lastNotifiIndex = currentPage * notifiPerPage;
	const firstNotifiIndex = lastNotifiIndex - notifiPerPage;
	const currentsNotifications = allNotices.slice(
		firstNotifiIndex,
		lastNotifiIndex
	);

	const classPagItem = styles["notifications__pag-item"];
	const classesPagItemActive = `${classPagItem} ${styles["notifications__pag-item--active"]}`;

	const middlePagNumberLower =
		([1, 2, 3].includes(currentPage) && maxPage >= 3) ||
		(currentPage === 4 && maxPage === currentPage);
	const middlePagNumberHigher =
		currentPage > 3 && maxPage >= 6 && currentPage + 3 <= maxPage;

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

			<ul className={styles.notifications__pag}>
				<li className={currentPage === 1 ? classesPagItemActive : classPagItem}>
					1
				</li>
				{maxPage >= 2 && (
					<li
						className={currentPage === 2 ? classesPagItemActive : classPagItem}>
						{((maxPage >= 2 && currentPage <= 3) || [4, 5].includes(maxPage)) &&
							"2"}
						{maxPage >= 6 && currentPage >= 4 && "..."}
					</li>
				)}
				{maxPage >= 3 && (
					<li
						className={
							currentPage === 3 ||
							(currentPage + 2 <= maxPage && ![1, 2].includes(currentPage))
								? classesPagItemActive
								: classPagItem
						}>
						{middlePagNumberLower && "3"}
						{middlePagNumberHigher && !middlePagNumberLower && currentPage}
						{!middlePagNumberHigher &&
							!middlePagNumberLower &&
							maxPage > 4 &&
							maxPage > 2 &&
							maxPage - 2}
					</li>
				)}

				{maxPage >= 4 && (
					<li
						className={
							(currentPage === maxPage - 1 && currentPage > 3) ||
							(maxPage === 4 && currentPage === maxPage)
								? classesPagItemActive
								: classPagItem
						}>
						{[4, 5].includes(maxPage) && maxPage <= 5 && "4"}
						{currentPage + 2 < maxPage && maxPage > 6 && "..."}
						{[currentPage + 2, currentPage + 1, currentPage].includes(
							maxPage
						) &&
							maxPage >= 5 &&
							maxPage - 1}
					</li>
				)}
				{maxPage >= 5 && (
					<li
						className={
							currentPage === maxPage && maxPage >= 5
								? classesPagItemActive
								: classPagItem
						}>
						{maxPage >= 5 && maxPage}
					</li>
				)}
			</ul>
		</ul>
	);
};

export default NotificationList;
