"use client";
import { useState, useEffect } from "react";
import CarouselItem from "./CarouselItem";
import Link from "next/link";
import LinkAsBtn from "../Link/LinkAsBtn";
import styles from "../../../styles/components/transitions/Carousel/Carousel.module.scss";
import { usePathname } from "next/navigation";

const Carousel = ({ btn_checkEvents, btn_createEvents, lang }) => {
	const isClient = typeof window !== "undefined";
	const [timer1, setTimer1] = useState(10000);
	const path = usePathname();
	const endOfPath = path.split("/").pop();

	const btn_pathDependent =
		endOfPath === "events" ? btn_createEvents : btn_checkEvents;

	const url_pathDependent =
		endOfPath === "events" ? "/events/new-event#form" : "/events";

	const changeMiddleHandler = async () => {
		if (isClient) {
			const itemOne = document.querySelector(
				`.${styles["carousel__item--left"]}`
			);
			const itemTwo = document.querySelector(
				`.${styles["carousel__item--middle"]}`
			);
			const itemThree = document.querySelector(
				`.${styles["carousel__item--right"]}`
			);
			itemOne.classList.remove(styles["carousel__item--left"]);
			itemTwo.classList.remove(styles["carousel__item--middle"]);
			itemThree.classList.remove(styles["carousel__item--right"]);
			itemOne.classList.add(styles["carousel__item--middle"]);
			itemTwo.classList.add(styles["carousel__item--right"]);
			itemThree.classList.add(styles["carousel__item--left"]);
		}
		setTimer1(10000);
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
				className={`${styles["carousel__item"]} ${styles["carousel__item--left"]}`}
				onClick={changeMiddleHandler}>
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
				className={`${styles["carousel__item"]} ${styles["carousel__item--middle"]}`}
				onClick={changeMiddleHandler}>
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
				className={`${styles["carousel__item"]} ${styles["carousel__item--right"]}`}
				onClick={changeMiddleHandler}>
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
				variant='green'
				className={styles["carousel__event-link"]}>
				{btn_pathDependent}
			</LinkAsBtn>
		</div>
	);
};

export default Carousel;
