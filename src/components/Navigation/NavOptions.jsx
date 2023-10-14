import Link from "next/link";
import styles from "../../styles/components/Navigation/NavOptions.module.scss";
import ImageFill from "../transitions/Image/ImageFill";
import Image from "next/image";

const NavOptions = () => {
	const title = "Utwórz wydarzenie";
	const wordsQuantity = title.split(" ").length;

	const classesParagraph =
		wordsQuantity > 1
			? `${styles["menu__item-title"]} ${styles["menu__item-title--bottom"]}`
			: styles["menu__item-title"];

	return (
		<ul className={styles.menu}>
			<li className={styles["menu__item"]}>
				<Link href='/' className={styles["menu__item-link"]}></Link>
				<ImageFill
					src='/images/background/background-logreg.webp'
					className={styles["menu__item-hexagon"]}
				/>
				{/* <Image src='/images/background/background-logreg.webp' fill /> */}
				<p className={styles["menu__item-title"]}>Wydarzenia</p>
			</li>

			<li className={styles["menu__item"]}>
				<Link href='/' className={styles["menu__item-link"]}></Link>
				<ImageFill
					src='/images/background/background-logreg.webp'
					className={styles["menu__item-hexagon"]}
				/>
				{/* <Image src='/images/background/background-logreg.webp' fill /> */}
				<p className={classesParagraph}>Utwórz wydarzenie</p>
			</li>

			<li className={styles["menu__item"]}>
				<Link href='/' className={styles["menu__item-link"]}></Link>
				<ImageFill
					src='/images/background/background-logreg.webp'
					className={styles["menu__item-hexagon"]}
				/>
				{/* <Image src='/images/background/background-logreg.webp' fill /> */}
				<p className={classesParagraph}>Utwórz wydarzenie</p>
			</li>
			<li className={styles["menu__item"]}>
				<Link href='/' className={styles["menu__item-link"]}></Link>
				<ImageFill
					src='/images/background/background-logreg.webp'
					className={styles["menu__item-hexagon"]}
				/>
				{/* <Image src='/images/background/background-logreg.webp' fill /> */}
				<p className={classesParagraph}>Utwórz wydarzenie</p>
			</li>
		</ul>
	);
};

export default NavOptions;
