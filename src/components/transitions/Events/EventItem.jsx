import IconRender from "@/components/Icons/IconRender";
import styles from "../../../styles/components/transitions/Events/EventItem.module.scss";
import ImageFill from "../Image/ImageFill";

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

	return (
		<li className={classes}>
			<ImageFill src={image} className={styles["event-item__img"]} />
			<p className={styles["event-item__town"]}>
				<IconRender
					variant='location'
					className={styles["event-item__town--icon"]}
				/>
				{town}
			</p>
			<address className={styles["event-item__date"]}>{date}</address>
			<p>Start wydarzenia:</p>
			<time className={styles["event-item__time"]}>
				<IconRender
					variant='clock'
					className={styles["event-item__town--icon"]}
				/>
				{time}
			</time>

			<h4 className={styles["event-item__title"]}>{title}</h4>
		</li>
	);
};

export default EventItem;
