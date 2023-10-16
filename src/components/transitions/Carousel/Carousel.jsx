"use client";
import CarouselItem from "./CarouselItem";
import Link from "next/link";
import LinkAsBtn from "../Link/LinkAsBtn";
import styles from "../../../styles/components/transitions/Carousel/Carousel.module.scss";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ButtonPag from "../Button/ButtonPag";

const Carousel = ({ btn_checkEvents, btn_createEvents, lang }) => {
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

	const [reverse, setReverse] = useState(false);
	const [block, setBlock] = useState(false);
	const path = usePathname();
	const endOfPath = path.split("/").pop();

	const btn_pathDependent =
		endOfPath === "events" ? btn_createEvents : btn_checkEvents;

	const url_pathDependent =
		endOfPath === "events" ? "/events/new-event#form" : "/events";

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

	return (
		<div className={styles.carousel}>
			<CarouselItem
				id='one'
				src='/images/events/concert1.jpg'
				alt='dsad'
				className={carouselItems[0]}
				onClick={() => changeMiddleHandler(direction(carouselItems[0]))}>
				<div className={styles["carousel__item-time"]}>
					<time dateTime='2018-07-07'>
						<span>1</span>
						<span>Maj</span>
						<span>2024</span>
					</time>
				</div>
				<h3>Rockowa Eksplozja Energii</h3>
				<Link href='/'>Dowiedz się więcej </Link>
			</CarouselItem>
			<CarouselItem
				id='two'
				alt='dasda'
				src='/images/events/concert2.jpg'
				className={carouselItems[1]}
				onClick={() => changeMiddleHandler(direction(carouselItems[1]))}>
				<div className={styles["carousel__item-time"]}>
					<time>
						<span>18</span>
						<span>Marzec</span>
						<span>2018</span>
					</time>
				</div>
				<h3>Muzyczna Noc pod Gwiazdami</h3>
				<Link href='/'>Dowiedz się więcej </Link>
			</CarouselItem>
			<CarouselItem
				id='three'
				alt='dasd'
				src='/images/events/concert6.png'
				className={carouselItems[2]}
				onClick={() => changeMiddleHandler(direction(carouselItems[2]))}>
				<div className={styles["carousel__item-time"]}>
					<time>
						<span>27</span>
						<span>Kwiecień</span>
						<span>2024</span>
					</time>
				</div>
				<h3>Klasyka w Nowoczesnym Wydaniu</h3>
				<Link href='/'>Dowiedz się więcej </Link>
			</CarouselItem>
			<LinkAsBtn
				href={`${url_pathDependent}`}
				className={styles["carousel__event-link"]}>
				{btn_pathDependent}
			</LinkAsBtn>
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
		</div>
	);
};

export default Carousel;
