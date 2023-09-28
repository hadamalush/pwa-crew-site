import styles from "../../../styles/components/transitions/Carousel/CarouselItem.module.scss";
import Image from "next/image";

const CarouselItem = ({
	onClick,
	id,
	className,
	src,
	alt,
	children,
	...props
}) => {
	const classes = `${styles["carousel-item"]} ${className}`;
	return (
		<div id={id} className={classes} onClick={onClick}>
			<Image
				src={src}
				alt={alt}
				width={0}
				height={0}
				fill
				sizes='100vw'
				className={styles["carousel-item__img"]}
			/>
			{children}
		</div>
	);
};

export default CarouselItem;
