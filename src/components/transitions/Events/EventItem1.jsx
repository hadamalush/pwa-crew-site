"use client";
import ImageFill from "../Image/ImageFill";
import LinkAsBtn from "../Link/LinkAsBtn";
import ButtonMain from "../Button/ButtonMain";
import styles from "../../../styles/components/transitions/Events/EventItem1.module.scss";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

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
	owner,
	...props
}) => {
	const { data: session } = useSession();
	const pathname = usePathname();

	const isOwner = owner === session?.user.email;
	const replacedTitle = title.replaceAll(" ", "-");
	const isMediumScreen = useMediaQuery({ minWidth: 768 });

	useEffect(() => {
		if (isMediumScreen) {
			return window.scrollBy(0, -70);
		}
	}, []);

	const lastPartOfLink = pathname.substring(pathname.lastIndexOf("/") + 1);
	const isDescription = id === lastPartOfLink;
	const urlLink_dependsPath = isDescription
		? `/events#${id + 7}`
		: `/events/${replacedTitle}/${id}#section_detail-item`;

	const classDNone = styles["event__element-invisible"];

	const classEvent = {
		details: isDescription
			? `${styles.event} ${styles["event--details"]}`
			: styles.event,
		address: isDescription
			? styles["event__address"]
			: `${styles["event__address"]} ${classDNone}`,
		time: isDescription ? "" : classDNone,
		text: isDescription
			? styles["event__text"]
			: `${styles["event__text"]} ${classDNone}`,
		img: isDescription
			? `${styles["event__img"]} ${styles["event__img--isSmall"]}`
			: styles["event__img"],
		link:
			isDescription && isOwner
				? `${styles["event__link-details"]} ${styles["event__link-details--isowner"]}`
				: styles["event__link-details"],
	};

	const imageSrc =
		upload === "mega" ? `data:image/webp;base64,${image}` : image;

	return (
		<li className={classEvent.details} id={id + 7}>
			<ImageFill
				src={imageSrc}
				alt={title}
				sizes='(max-width: 568px) 80vw, (min-width: 568px) 30vw'
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
				<LinkAsBtn href={urlLink_dependsPath} className={classEvent.link}>
					{isDescription ? "Previous page" : "See details"}
				</LinkAsBtn>
				{isOwner && isDescription && (
					<div className={styles["event__btns"]}>
						<ButtonMain>Delete</ButtonMain>
						<ButtonMain>Edit</ButtonMain>
					</div>
				)}
			</div>
		</li>
	);
};

export default EventItem1;
