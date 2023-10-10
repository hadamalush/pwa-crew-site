import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import Carousel from "@/components/transitions/Carousel/Carousel";
import styles from "./page.module.scss";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";

export default async function Layout({ params: { lang }, children, ...props }) {
	const dict = await getDictionaryElements(lang);

	const btn_checkEvents = dict.events.btn_checkEvents;
	const btn_createEvents = dict.events.btn_createEvent;

	return (
		<main>
			<WrapperStart className={styles.container}>
				<Carousel
					btn_checkEvents={btn_checkEvents}
					btn_createEvents={btn_createEvents}
					lang={lang}
				/>
			</WrapperStart>
			{children}
		</main>
	);
}
