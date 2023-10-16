"use client";
import CarouselItem from "./CarouselItem";
import Link from "next/link";
import LinkAsBtn from "../Link/LinkAsBtn";
import styles from "../../../styles/components/transitions/Carousel/Carousel.module.scss";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Carousel = ({ btn_checkEvents, btn_createEvents, lang }) => {
	const isClient = typeof window !== "undefined";
	const classItem = styles["carousel__item"];

	const classesNameConst = [
		`${classItem} ${styles["carousel__item--left"]}`,
		`${classItem} ${styles["carousel__item--middle"]}`,
		`${classItem} ${styles["carousel__item--right"]}`,
		`${classItem} ${styles["carousel__item--left-reverse"]}`,
		`${classItem} ${styles["carousel__item--right-reverse"]}`,
	];

	const [counter, setCounter] = useState(0);
	const [carouselItems, setCarouselItems] = useState([
		classesNameConst[0],
		classesNameConst[1],
		classesNameConst[2],
	]);

	const [timer1, setTimer1] = useState(10000);
	const [block, setBlock] = useState(false);
	const path = usePathname();
	const endOfPath = path.split("/").pop();

	const btn_pathDependent =
		endOfPath === "events" ? btn_createEvents : btn_checkEvents;

	const url_pathDependent =
		endOfPath === "events" ? "/events/new-event#form" : "/events";

	const changeMiddleHandler = direction => {
		if (isClient && !block) {
			setCounter(prev => (direction === "right" ? prev + 1 : 1));
			setBlock(true);

			console.log(counter);

			setCarouselItems(prevItems => {
				const updatedItems = [...prevItems];
				let itemOneIndex = updatedItems.findIndex(
					item => item === classesNameConst[0] || item === classesNameConst[3]
				);
				let itemTwoIndex = updatedItems.findIndex(
					item => item === classesNameConst[1]
				);
				let itemThreeIndex = updatedItems.findIndex(
					item => item === classesNameConst[2] || item === classesNameConst[4]
				);

				if (
					(counter === 0 && direction === "right") ||
					(counter > 0 && direction === "left")
				) {
					updatedItems[itemOneIndex] =
						direction === "right" ? classesNameConst[3] : classesNameConst[0];
					updatedItems[itemTwoIndex] =
						direction === "right" ? classesNameConst[4] : classesNameConst[2];
					updatedItems[itemThreeIndex] = classesNameConst[1];

					if (direction === "left") {
						setCounter(0);
					}

					return updatedItems;
				}

				if (direction === "left") {
					setCounter(0);
				}

				updatedItems[itemOneIndex] = classesNameConst[1];
				updatedItems[itemTwoIndex] =
					direction === "right" ? classesNameConst[4] : classesNameConst[2];
				updatedItems[itemThreeIndex] =
					direction === "right" ? classesNameConst[3] : classesNameConst[0];

				return updatedItems;
			});

			setTimeout(() => setBlock(false), 1200);
		}

		// setTimer1(10000);
	};

	// useEffect(() => {
	// 	const spin = setInterval(changeMiddleHandler, timer1);
	// 	return () => clearInterval(spin);
	// }, [timer1]);

	return (
		<div className={styles.carousel}>
			<CarouselItem
				id='one'
				src='/images/events/audience.jpg'
				alt='dsad'
				className={carouselItems[0]}
				onClick={() => changeMiddleHandler("left")}>
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
				src='/images/events/confetti.jpg'
				className={carouselItems[1]}>
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
				src='/images/events/woman.jpg'
				className={carouselItems[2]}
				onClick={() => changeMiddleHandler("right")}>
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

			<p onClick={() => changeMiddleHandler("left")}>lewo</p>
			<p onClick={() => changeMiddleHandler("right")}>prawo</p>
		</div>
	);
};

export default Carousel;
