"use client";
import IconRender from "@/components/Icons/IconRender";
import ImageFill from "../Image/ImageFill";
import LinkAsBtn from "../Link/LinkAsBtn";
import styles from "../../../styles/components/transitions/Events/EventItem.module.scss";

const EventItem = ({
	className,
	title,
	date,
	town,
	street,
	codePost,
	time,
	image,
	id,
	...props
}) => {
	const classes = `${styles["event-item"]} '${className}`;

	const showDetailHandler = () => {
		const detailsList = document.getElementById(id);

		detailsList.classList.toggle(styles["event-item__accordion--control"]);
	};

	return (
		<li className={classes} onClick={showDetailHandler}>
			<div className={styles["event-item__box"]}>
				<ImageFill
					src={image}
					alt='test'
					className={styles["event-item__img"]}
				/>
				<div className={styles["event-item__content"]}>
					<p className={styles["event-item__town"]}>{town}</p>
					<address className={styles["event-item__date"]}>{date}</address>
					<p>Start wydarzenia:</p>
					<time className={styles["event-item__time"]}>{time}</time>
				</div>
			</div>

			<div className={styles["event-item__accordion"]} id={id}>
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
			</div>
			<h4 className={styles["event-item__title"]}>{title}</h4>
		</li>
	);
};

export default EventItem;
