"use client";
import IconRender from "@/components/Icons/IconRender";
import ImageFill from "../Image/ImageFill";
import LinkAsBtn from "../Link/LinkAsBtn";
import styles from "../../../styles/components/transitions/Events/EventItem1.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ButtonMain from "../Button/ButtonMain";

const EventItem1 = ({
	className,
	title,
	date,
	town,
	street,
	codePost,
	time,
	image,
	upload,
	description,
	id,
	lang,
	trl_btnEventDetails,
	trl_startEvent,
	...props
}) => {
	const replacedTitle = title.replaceAll(" ", "-");
	const pathname = usePathname();

	const lastPartOfLink = pathname.substring(pathname.lastIndexOf("/") + 1);
	const isDescription = id === lastPartOfLink;

	const isSmallScreen = useMediaQuery({ minWidth: 568 });
	const classDNone = styles["event__element-invisible"];

	const classEvent = {
		address: isDescription
			? styles["event__address"]
			: `${styles["event__address"]} ${classDNone}`,
		time: isDescription
			? styles["event__time"]
			: `${styles["event__time"]} ${classDNone}`,
		text: isDescription
			? styles["event__text"]
			: `${styles["event__text"]} ${classDNone}`,
		img: isDescription
			? `${styles["event__img"]} ${styles["event__img--isSmall"]}`
			: styles["event__img"],
	};

	const imageSrc =
		upload === "mega" ? `data:image/webp;base64,${image}` : image;

	// const classes = `${styles["event-item"]} ${className}`;
	// const classesEventItem = !isDescription
	// 	? classes
	// 	: `${classes} ${styles["event-item__alone"]}`;
	// const classesAccordion = !isDescription
	// 	? styles["event-item__accordion"]
	// 	: `${styles["event-item__accordion"]} ${styles["event-item__accordion--control"]}`;

	// const showDetailHandler = () => {
	// 	const detailsList = document.getElementById(id);
	// 	detailsList.classList.toggle(styles["event-item__accordion--control"]);
	// };

	// useEffect(() => {
	// 	if (isMediumScreen) {
	// 		return window.scrollBy(0, -70);
	// 	}
	// }, []);

	return (
		<li className={styles.event}>
			<ImageFill
				src={imageSrc}
				alt={title}
				sizes='(max-width: 991px) 10vw, (min-width: 992px) 30vw'
				className={classEvent.img}
			/>
			<div className={styles["event__informations"]}>
				<h2>{title}</h2>
				<address className={classEvent.address}>
					<h3>Address</h3>
					<p>{town}</p>
					<p>{codePost}</p>
					<p>{street}</p>
				</address>
				<time className={`${styles["event__time"]}`}>
					<h3>Start event</h3>
					<p>{date}</p>
					<p className={classEvent.time}>{time}</p>
				</time>
			</div>
			<div className={classEvent.text}>
				<h3>Description</h3>
				<p>{description}</p>
			</div>
			<div className={styles["event__tools"]}>
				<LinkAsBtn
					href={`/events/${replacedTitle}/${id}#section_detail-item`}
					className={`${styles["event__link-details"]}`}>
					See details
				</LinkAsBtn>
			</div>
		</li>
	);
};

export default EventItem1;
