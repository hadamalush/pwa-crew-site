"use client";
import styles from "../../../styles/components/transitions/Image/ImageFill.module.scss";
import Image from "next/image";

/**
 * @description This is the image component with fill wrapped in div.
 * @param {Boolean} priority Enter true or false.
 * @param {String} src Enter image source as string
 * @param {String} alt Enter alt as string.
 * @param {String} className Enter className as string.
 * @param {String} sizes Enter sizes as string. For example:(max-width: 768px) 100vw,
 * @returns {JSX.Element} Returns div.
 */

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
				className={`${styles.img} ${className || ""}`}
				sizes={sizes}
			/>
		</div>
	);
}
