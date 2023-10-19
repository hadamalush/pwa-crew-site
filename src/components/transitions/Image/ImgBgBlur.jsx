import Image from "next/image";
import styles from "../../../styles/components/transitions/Image/ImageBgBlur.module.scss";

/**
 * @description Component with dark blur. takes up the entire width and height of parent. Parent should have position relative.
 * @param {String} className Enter className as string.
 * @param {String} src Enter image source as string.
 * @returns {JSX.Element} Returns image wrapped span.
 */

const ImgBgBlur = ({ className, src }) => {
	return (
		<span className={`${styles.img} ${className || ""}`}>
			<Image src={src} fill alt='Background with blur.' />
		</span>
	);
};

export default ImgBgBlur;
