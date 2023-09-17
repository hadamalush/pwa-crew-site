import styles from "../../../styles/components/transitions/Image/ImageLoader.module.scss";

import Image from "next/image";

const ImageLoader = props => {
	const classes = `${styles["img__loader"]} ${styles.className}`;

	return (
		<div className={classes}>
			<Image
				priority
				src={props.src}
				alt={props.alt}
				fill
				className={styles[styles.img]}
			/>
		</div>
	);
};

export default ImageLoader;
