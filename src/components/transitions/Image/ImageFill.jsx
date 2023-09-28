"use client";
import styles from "../../../styles/components/transitions/Image/ImageFill.module.scss";
import Image from "next/image";

export default function ImageFill({
	priority,
	src,
	alt,
	className,
	sizes,
	...props
}) {
	return (
		<div className={className}>
			<Image
				priority={priority}
				src={src}
				alt={alt}
				fill
				className={styles.img}
				sizes={sizes}
			/>
		</div>
	);
}
