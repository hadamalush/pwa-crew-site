import Carousel from "@/components/transitions/Carousel/Carousel";
import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import LinkAsBtn from "@/components/transitions/Link/LinkAsBtn";
import styles from "./page.module.scss";

export default function Events() {
	return (
		<WrapperStart className={styles.container}>
			<Carousel />
			<LinkAsBtn href='/' variant='green' className={styles["container__link"]}>
				Utwórz wydarzenie
			</LinkAsBtn>
		</WrapperStart>
	);
}
