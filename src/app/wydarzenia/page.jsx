import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import EventsList from "@/components/transitions/Events/EventsList";
import styles from "./page.module.scss";

export default function Events() {
	return (
		<>
			<WrapperSection className={styles["section-events"]}>
				<h1>Wydarzenia</h1>
				<EventsList />
			</WrapperSection>
		</>
	);
}
