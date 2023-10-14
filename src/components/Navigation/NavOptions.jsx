import Link from "next/link";
import styles from "../../styles/components/Navigation/NavOptions.module.scss";
import ImageFill from "../transitions/Image/ImageFill";
import Image from "next/image";
import IconRender from "../Icons/IconRender";

const NavOptions = ({ className }) => {
	const array = [
		{ title: "Wydarzenia", href: "/" },
		{ title: "Utwórz wydarzenia", href: "/" },
		{ title: "Utwórz wydarzenia", href: "/" },
		{ title: "Utwórz wydarzenia", href: "/" },
	];
	const quantityOptions = array.length;
	const classesGeneral = `${styles.menu} ${className || ""}`;
	let i = 0;

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
				i++;

				return (
					<li key={i} className={classItem}>
						<Link href='/' className={styles["menu__item-link"]}></Link>
						<ImageFill
							src='/images/background/background-logreg.webp'
							className={styles["menu__item-hexagon"]}
						/>
						<p className={classesParagraph}>{item.title}</p>
					</li>
				);
			})}
			<IconRender
				variant='cross'
				className={
					quantityOptions === 4
						? `${styles["menu__cutout"]} ${styles["menu__cutout--second"]}`
						: styles["menu__cutout"]
				}
			/>
		</ul>
	);
};

export default NavOptions;
