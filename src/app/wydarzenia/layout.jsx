import styles from "./page.module.scss";
import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import Carousel from "@/components/transitions/Carousel/Carousel";
import LinkAsBtn from "@/components/transitions/Link/LinkAsBtn";

export default function Layout({ children }) {
	return (
		<main>
			<WrapperStart className={styles.container}>
				<Carousel />
				<LinkAsBtn
					href='/'
					variant='green'
					className={styles["container__link"]}>
					Utwórz wydarzenie
				</LinkAsBtn>
			</WrapperStart>

			{children}
		</main>
	);
}
