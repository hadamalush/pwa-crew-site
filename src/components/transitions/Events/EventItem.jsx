"use client";

import IconRender from "@/components/Icons/IconRender";
import styles from "../../../styles/components/transitions/Events/EventItem.module.scss";
import ImageFill from "../Image/ImageFill";
import LinkAsBtn from "../Link/LinkAsBtn";

const EventItem = ({
	className,
	title,
	date,
	town,
	street,
	codePost,
	time,
	image,
	...props
}) => {
	const classes = `${styles["event-item"]} '${className}`;

	const showDetailHandler = () => {
		const detailsList = document.querySelector(`.${styles.details}`);

		detailsList.classList.toggle(styles["details-show"]);
	};

	return (
		<>
			<li className={classes} onClick={showDetailHandler}>
				<div className={styles["event-item__box"]}>
					<ImageFill
						src={image}
						alt='test'
						className={styles["event-item__img"]}
					/>
					<div className={styles["event-item__content"]}>
						<p className={styles["event-item__town"]}>{town}</p>
						<address className={styles["event-item__date"]}>
							{/* <IconRender
							variant='location'
							className={styles["event-item__town--icon"]}
						/>
						{date} */}
						</address>
						<p>Start wydarzenia:</p>
						<time className={styles["event-item__time"]}>
							<IconRender
								variant='clock'
								className={styles["event-item__town--icon"]}
							/>
							{time}
						</time>
					</div>
				</div>

				<ul className={styles["details"]}>
					<li className={styles["details__item"]}>
						<IconRender
							variant='location'
							className={styles["details__item-icon"]}
						/>
						<address>
							<p>{town}</p>
							<p>{codePost}</p>
							<p>{street}</p>
						</address>
					</li>
					<li className={styles["details__item"]}>
						<IconRender
							variant='clock'
							className={styles["details__item-icon"]}
						/>
						<time>
							<p>{date}</p>
							<p>{time}</p>
						</time>
					</li>
					<li className={styles["details__item"]}>
						<IconRender
							variant='description'
							className={styles["details__item-icon"]}
						/>
						<LinkAsBtn href=''>Zobacz szczegóły</LinkAsBtn>
					</li>
				</ul>

				<h4 className={styles["event-item__title"]}>{title}</h4>
			</li>
		</>
	);
};

export default EventItem;
