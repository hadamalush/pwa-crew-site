"use client";
import CarouselItem from "./CarouselItem";
import Link from "next/link";
import LinkAsBtn from "../Link/LinkAsBtn";
import ButtonPag from "../Button/ButtonPag";
import styles from "../../../styles/components/transitions/Carousel/Carousel.module.scss";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";

const Carousel = ({ btn_checkEvents, btn_createEvents, events, lang }) => {
	const [reverse, setReverse] = useState(false);
	const [block, setBlock] = useState(false);
	const path = usePathname();
	const endOfPath = path.split("/").pop();

	const isClient = typeof window !== "undefined";
	const classItem = styles["carousel__item"];

	const classesNameConst = [
		`${classItem} ${styles["carousel__item--left"]}`,
		`${classItem} ${styles["carousel__item--middle"]}`,
		`${classItem} ${styles["carousel__item--right"]}`,
		`${classItem} ${styles["carousel__item--left-reverse"]}`,
		`${classItem} ${styles["carousel__item--right-reverse"]}`,
		`${classItem} ${styles["carousel__item--left-animation"]}`,
	];

	const [carouselItems, setCarouselItems] = useState([
		classesNameConst[0],
		classesNameConst[1],
		classesNameConst[2],
	]);

	const btn_pathDependent =
		endOfPath === "events" ? btn_createEvents : btn_checkEvents;

	const url_pathDependent =
		endOfPath === "events"
			? "/events/new-event#form"
			: "/events#section-events";

	console.log(url_pathDependent);
	const changeMiddleHandler = direction => {
		if (!direction) return;
		if (isClient && !block) {
			setReverse(prev => (direction === "right" ? true : prev));
			setBlock(true);

			setCarouselItems(prevItems => {
				const updatedItems = [...prevItems];
				let itemOneIndex = updatedItems.findIndex(
					item =>
						item === classesNameConst[0] ||
						item === classesNameConst[3] ||
						item === classesNameConst[5]
				);
				let itemTwoIndex = updatedItems.findIndex(
					item => item === classesNameConst[1]
				);
				let itemThreeIndex = updatedItems.findIndex(
					item => item === classesNameConst[2] || item === classesNameConst[4]
				);

				if (
					(!reverse && direction === "right") ||
					(reverse && direction === "left")
				) {
					updatedItems[itemOneIndex] =
						direction === "right" ? classesNameConst[3] : classesNameConst[5];
					updatedItems[itemTwoIndex] =
						direction === "right" ? classesNameConst[4] : classesNameConst[2];
					updatedItems[itemThreeIndex] = classesNameConst[1];

					if (direction === "left") {
						setReverse(false);
					}
					return updatedItems;
				}

				if (direction === "left") {
					setReverse(false);
				}
				updatedItems[itemOneIndex] = classesNameConst[1];
				updatedItems[itemTwoIndex] =
					direction === "right" ? classesNameConst[4] : classesNameConst[2];
				updatedItems[itemThreeIndex] =
					direction === "right" ? classesNameConst[3] : classesNameConst[5];

				return updatedItems;
			});

			const spin = setTimeout(() => {
				setBlock(false);
			}, 1200);

			() => clearTimeout(spin);
		}
	};

	const direction = item => {
		if (
			item === classesNameConst[0] ||
			item === classesNameConst[5] ||
			item === classesNameConst[4]
		)
			return "left";
		if (item === classesNameConst[2] || item === classesNameConst[3])
			return "right";
	};
	let i = 0;
	return (
		<div className={styles.carousel}>
			{events.map(carouselItem => {
				const date = new Date(carouselItem.date);
				const monthName = format(date, "MMMM");
				const day = format(date, "dd");
				const year = format(date, "yyyy");
				const styles = carouselItems[i];

				i++;
				return (
					<CarouselItem
						key={carouselItem.id}
						id={carouselItem.id}
						src={carouselItem.targetSrc}
						alt={carouselItem.title}
						className={styles}
						onClick={() => changeMiddleHandler(() => direction(styles))}>
						<div className={styles["carousel__item-time"]}>
							<time dateTime='2018-07-07'>
								<span>{day}</span>
								<span>{monthName}</span>
								<span>{year}</span>
							</time>
						</div>
						<h3>{carouselItem.title}</h3>
						<Link href='/'>Dowiedz się więcej </Link>
					</CarouselItem>
				);
			})}
			<ButtonPag
				className={styles["carousel__btn-next"]}
				variant='next'
				onClick={() => changeMiddleHandler("right")}>
				Next event.
			</ButtonPag>
			<ButtonPag
				className={styles["carousel__btn-next--left"]}
				variant='prev'
				onClick={() => changeMiddleHandler("left")}>
				Previous event.
			</ButtonPag>
			<LinkAsBtn
				href={`${url_pathDependent}`}
				className={styles["carousel__event-link"]}>
				{btn_pathDependent}
			</LinkAsBtn>
		</div>
	);
};

export default Carousel;
