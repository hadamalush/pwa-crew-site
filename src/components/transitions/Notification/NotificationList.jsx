"use client";

import NotificationItem from "./NotificationItem";
import styles from "../../../styles/components/transitions/Notification/NotificationList.module.scss";
import IconRender from "@/components/Icons/IconRender";
import { useState } from "react";

const NotificationList = ({ notifications }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [notifiPerPage, setNotifiPerPage] = useState(2);

	if (!notifications) return null;

	const keys = Object.keys(notifications);
	const allNotices = Object.values(notifications);
	let n = 0;

	const noticesWithKeys = allNotices.map(item => {
		n++;
		return { id: keys[n - 1], ...item };
	});

	const sortedNotifications = noticesWithKeys.sort((a, b) => {
		if (new Date(a.createdDate) > new Date(b.createdDate)) {
			return -1;
		}
		if (new Date(a.createdDate) < new Date(b.createdDate)) {
			return +1;
		}
		return 0;
	});

	const maxPage = Math.ceil(allNotices.length / notifiPerPage);

	const lastNotifiIndex = currentPage * notifiPerPage;
	const firstNotifiIndex = lastNotifiIndex - notifiPerPage;
	const currentsNotifications = sortedNotifications.slice(
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

	const changePageHandler = (event, action) => {
		if (action) {
			if (action === "back" && currentPage === 1) return;
			else if (action === "back") {
				setCurrentPage(prevState => prevState - 1);
				return;
			}

			if (action === "next" && currentPage === maxPage) return;
			else if (action === "next") {
				setCurrentPage(prevState => prevState + 1);
				return;
			}
		}

		const liElement = event.target;
		const value = liElement.textContent.trim();
		if (isNaN(value)) return;

		const enteredPage = parseInt(value);
		setCurrentPage(enteredPage);
	};

	return (
		<ul className={styles.notifications}>
			<h2 className={styles["notifications__heading"]}>Powiadomienia</h2>
			{currentsNotifications.map(notif => {
				return (
					<NotificationItem
						key={notif.id}
						action={notif.action}
						actionTextPL={notif.action_text_pl}
						actionTextEN={notif.action_text_en}
						title={notif.title}
						href={notif.href}
						status={notif?.status}
						owner={notif.owner}
						createdDate={notif.createdDate}
					/>
				);
			})}

			<ul className={styles.notifications__pag}>
				<IconRender
					variant='arrow_back'
					className={styles["notifications__pag-arrow"]}
					onClick={event => changePageHandler(event, "back")}
				/>
				<li
					className={currentPage === 1 ? classesPagItemActive : classPagItem}
					onClick={event => changePageHandler(event)}>
					1
				</li>
				{maxPage >= 2 && (
					<li
						className={currentPage === 2 ? classesPagItemActive : classPagItem}
						onClick={event => changePageHandler(event)}>
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
						}
						onClick={event => changePageHandler(event)}>
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
						}
						onClick={event => changePageHandler(event)}>
						{[4, 5].includes(maxPage) && maxPage <= 5 && "4"}
						{currentPage + 2 < maxPage && maxPage >= 6 && "..."}
						{[currentPage + 2, currentPage + 1, currentPage].includes(
							maxPage
						) &&
							maxPage >= 6 &&
							maxPage - 1}
					</li>
				)}
				{maxPage >= 5 && (
					<li
						className={
							currentPage === maxPage && maxPage >= 5
								? classesPagItemActive
								: classPagItem
						}
						onClick={event => changePageHandler(event)}>
						{maxPage >= 5 && maxPage}
					</li>
				)}

				<IconRender
					variant='arrow_next'
					className={styles["notifications__pag-arrow"]}
					onClick={event => changePageHandler(event, "next")}
				/>
			</ul>
		</ul>
	);
};

export default NotificationList;
