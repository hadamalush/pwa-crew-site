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
	upload,
	id,
	...props
}) => {
	const classes = `${styles["event-item"]} '${className}`;

	console.log(upload);

	const imageSrc =
		upload === "mega" ? `data:image/jpeg;base64,${image}` : image;

	console.log(imageSrc);

	const showDetailHandler = () => {
		const detailsList = document.getElementById(id);

		detailsList.classList.toggle(styles["event-item__accordion--control"]);
	};

	return (
		<li className={classes} onClick={showDetailHandler}>
			<div className={styles["event-item__box"]}>
				<ImageFill
					src={imageSrc}
					alt={title}
					sizes='(max-width: 991px) 10vw, (min-width: 992px) 30vw'
					className={styles["event-item__img"]}
				/>
				{/* <ImageFill
					src={image}
					alt={title}
					sizes='(max-width: 991px) 10vw, (min-width: 992px) 30vw'
					className={styles["event-item__img"]}
				/> */}

				<div className={styles["event-item__content"]}>
					<p className={styles["event-item__town"]}>{town}</p>
					<address className={styles["event-item__date"]}>{date}</address>
					<p>Start wydarzenia:</p>
					<time className={styles["event-item__time"]}>{time}</time>
				</div>
			</div>

			<div className={styles["event-item__accordion"]} id={id}>
				<ImageFill
					src='/images/events/social.png'
					alt=''
					sizes='(max-width: 991px) 0vw, (min-width: 992px) 20vw'
					className={styles["event-item__accordion-bgc"]}
				/>
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
						<div className={styles["details__item-link"]}>
							<LinkAsBtn href=''>Zobacz szczegóły</LinkAsBtn>
						</div>
					</li>
				</ul>
			</div>

			<div className={styles["event-item__title"]}>
				<IconRender variant='title' className={styles["details__item-icon"]} />
				<h4>{title}</h4>
			</div>
			{/* <h4 className={styles["event-item__title"]}>{title}</h4> */}
		</li>
	);
};

export default EventItem;
