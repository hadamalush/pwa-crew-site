import Carousel from "@/components/transitions/Carousel/Carousel";
import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import LinkAsBtn from "@/components/transitions/Link/LinkAsBtn";
import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import EventsList from "@/components/transitions/Events/EventsList";
import styles from "./page.module.scss";

export default function Events() {
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
			<WrapperSection className={styles["section-events"]}>
				<EventsList />
			</WrapperSection>
		</main>
	);
}
