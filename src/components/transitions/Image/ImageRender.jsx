"use client";
import styles from "../../../styles/components/transitions/Image/ImageRender.module.scss";
import { ImageBase } from "./ImageBase";
import Image from "next/image";

export default function ImageLoader(props) {
	const classes = `${styles.img} ${props.className}`;

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
			case "concert":
				return images.concert;
			default:
				return null;
		}
	};

	const selectedImage = imageSwitch(variant);

	return (
		<Image
			priority={props.priority}
			src={selectedImage}
			alt={props.alt}
			fill
			className={classes}
			sizes={props.sizes}
		/>
	);
}
