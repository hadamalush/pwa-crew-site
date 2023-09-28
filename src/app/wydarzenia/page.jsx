import Carousel from "@/components/transitions/Carousel/Carousel";
import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import styles from "./page.module.scss";

export default function Events() {
	return (
		<WrapperStart className={styles.container}>
            <h1></h1>

			<Carousel />
		</WrapperStart>
	);
}
