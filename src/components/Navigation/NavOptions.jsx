import Link from "next/link";
import styles from "../../styles/components/Navigation/NavOptions.module.scss";
import ImageFill from "../transitions/Image/ImageFill";
import Image from "next/image";

const NavOptions = ({ className }) => {
	const array = [
		{ title: "Wydarzenia", href: "/" },
		{ title: "Utwórz wydarzenia", href: "/" },
		// { title: "Utwórz wydarzenia", href: "/" },
		// { title: "Utwórz wydarzenia", href: "/" },
	];
	const quantityOptions = array.length;
	const classesGeneral = `${styles.menu} ${className || ""}`;

	return (
		<ul className={classesGeneral}>
			{array.map(item => {
				const wordsQuantity = item.title.split(" ").length;

				const classItem =
					quantityOptions === 2
						? `${styles["menu__item"]} ${styles["menu__item--second"]}`
						: styles["menu__item"];

				const classesParagraph =
					wordsQuantity > 1
						? `${styles["menu__item-title"]} ${styles["menu__item-title--bottom"]}`
						: styles["menu__item-title"];

				return (
					<li className={classItem}>
						<Link href='/' className={styles["menu__item-link"]}></Link>
						<ImageFill
							src='/images/background/background-logreg.webp'
							className={styles["menu__item-hexagon"]}
						/>
						<p className={classesParagraph}>{item.title}</p>
					</li>
				);
			})}

			{/* <li className={styles["menu__item"]}>
				<Link href='/' className={styles["menu__item-link"]}></Link>
				<ImageFill
					src='/images/background/background-logreg.webp'
					className={styles["menu__item-hexagon"]}
				/>

				<p className={styles["menu__item-title"]}>Wydarzenia</p>
			</li>

			<li className={`${styles["menu__item"]} ${styles["menu__item--second"]}`}>
				<Link href='/' className={styles["menu__item-link"]}></Link>
				<ImageFill
					src='/images/background/background-logreg.webp'
					className={styles["menu__item-hexagon"]}
				/>

				<p className={classesParagraph}>Utwórz wydarzenie</p>
			</li> */}

			{/* <li className={styles["menu__item"]}>
				<Link href='/' className={styles["menu__item-link"]}></Link>
				<ImageFill
					src='/images/background/background-logreg.webp'
					className={styles["menu__item-hexagon"]}
				/>
				<p className={classesParagraph}>Utwórz wydarzenie</p>
			</li>
			<li className={styles["menu__item"]}>
				<Link href='/' className={styles["menu__item-link"]}></Link>
				<ImageFill
					src='/images/background/background-logreg.webp'
					className={styles["menu__item-hexagon"]}
				/>
				<p className={classesParagraph}>Utwórz wydarzenie</p>
			</li> */}
		</ul>
	);
};

export default NavOptions;
