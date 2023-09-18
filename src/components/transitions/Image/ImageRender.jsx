"use client";
import styles from "../../../styles/components/transitions/Image/ImageRender.module.scss";
import { ImageBase } from "./ImageBase";
import Image from "next/image";

export default function ImageLoader(props) {
	const classes = `${styles.img} ${styles.className}`;

	const images = ImageBase();
	const variant = props.variant;

	const imageSwitch = variant => {
		switch (variant) {
			case "man-on-the-stage":
				return images.man;
			case "baker":
				return images.baker;
			case "david":
				return images.david;
			case "marian":
				return images.marian;
			case "neo":
				return images.neo;
			default:
				return null;
		}
	};

	const selectedImage = imageSwitch(variant);

	return (
		<Image
			priority
			src={selectedImage}
			alt={props.alt}
			fill
			className={classes}
			sizes='(max-width: 768px) 90vw, (min-width: 1200px) 40vw'
		/>
	);
}
