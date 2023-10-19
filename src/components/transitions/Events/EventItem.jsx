"use client";
import IconRender from "@/components/Icons/IconRender";
import ImageFill from "../Image/ImageFill";
import LinkAsBtn from "../Link/LinkAsBtn";
import styles from "../../../styles/components/transitions/Events/EventItem.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

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

	const imageSrc =
		upload === "mega" ? `data:image/webp;base64,${image}` : image;

	const classes = `${styles["event-item"]} ${className}`;
	const classesEventItem = !isDescription
		? classes
		: `${classes} ${styles["event-item__alone"]}`;
	const classesAccordion = !isDescription
		? styles["event-item__accordion"]
		: `${styles["event-item__accordion"]} ${styles["event-item__accordion--control"]}`;
	const isMediumScreen = useMediaQuery({ minWidth: 768 });

	const showDetailHandler = () => {
		const detailsList = document.getElementById(id);
		detailsList.classList.toggle(styles["event-item__accordion--control"]);
	};

	useEffect(() => {
		if (isMediumScreen) {
			return window.scrollBy(0, -70);
		}
	}, []);

	return (
		<li
			className={classesEventItem}
			onClick={!isDescription ? showDetailHandler : null}
			id={id + 7}>
			{isDescription && (
				<Link
					href={`/events#${id + 7}`}
					className={styles["event-item__arrow-back"]}>
					<IconRender variant='arrow_back' />
				</Link>
			)}

			<div className={styles["event-item__box"]}>
				<ImageFill
					src={imageSrc}
					alt={title}
					sizes='(max-width: 991px) 10vw, (min-width: 992px) 30vw'
					className={styles["event-item__img"]}
				/>

				<div className={styles["event-item__content"]}>
					<p className={styles["event-item__town"]}>{town}</p>
					<address className={styles["event-item__date"]}>{date}</address>
					<p>{trl_startEvent}</p>
					<time className={styles["event-item__time"]}>{time}</time>
				</div>
			</div>

			<div className={classesAccordion} id={id}>
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
					{!isDescription && (
						<li className={styles["details__item"]}>
							<IconRender
								variant='description'
								className={styles["details__item-icon"]}
							/>
							<div className={styles["details__item-link"]}>
								<LinkAsBtn
									href={`/events/${replacedTitle}/${id}#section_detail-item`}>
									{trl_btnEventDetails}
								</LinkAsBtn>
							</div>
						</li>
					)}
					{isDescription && (
						<li className={styles["details__item"]}>
							<IconRender
								variant='description'
								className={styles["details__item-icon"]}
							/>
							<p className={styles["details__item-description"]}>
								{description}
							</p>
						</li>
					)}
				</ul>
			</div>

			<div className={styles["event-item__title"]}>
				<IconRender variant='title' className={styles["details__item-icon"]} />
				<h4>{title}</h4>
			</div>
		</li>
	);
};

export default EventItem;
