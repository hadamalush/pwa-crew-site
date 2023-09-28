"use client";
import CarouselItem from "./CarouselItem";
import Link from "next/link";
import styles from "../../../styles/components/transitions/Carousel/Carousel.module.scss";

const Carousel = () => {
	const isClient = typeof window !== "undefined";

	const changeMiddleHandler = () => {
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
	};

	setInterval(changeMiddleHandler, 10000);

	return (
		<div className={styles.carousel}>
			<CarouselItem
				id='one'
				src='/images/events/audience.jpg'
				alt='dsad'
				className={`${styles["carousel__item"]} ${styles["carousel__item--left"]}`}
				onClick={changeMiddleHandler}>
				<div className={styles["carousel__item-time"]}>
					<time datetime='2018-07-07'>
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
					<time datetime='2018-07-07'>
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
					<time datetime='2018-07-07'>
						<span>27</span>
						<span>Kwiecień</span>
						<span>2024</span>
					</time>
				</div>
				<h3>Klasyka w Nowoczesnym Wydaniu</h3>
				<Link href='/'>Dowiedz się więcej </Link>
			</CarouselItem>
		</div>
	);
};

export default Carousel;
