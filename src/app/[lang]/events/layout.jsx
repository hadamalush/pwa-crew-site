import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import Carousel from "@/components/transitions/Carousel/Carousel";
import styles from "./page.module.scss";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";

export default async function Layout({
	params: { lang },
	eventModal,
	children,
	...props
}) {
	if (!lang) {
		return null;
	}

	const events = await getData();
	const dict = await getDictionaryElements(lang);

	const btn_checkEvents = dict.events.btn_checkEvents;
	const btn_createEvents = dict.events.btn_createEvent;

	// console.log(eventModal);

	return (
		<main>
			<WrapperStart className={styles.container}>
				<Carousel
					btn_checkEvents={btn_checkEvents}
					btn_createEvents={btn_createEvents}
					events={events}
					lang={lang}
				/>
			</WrapperStart>
			{children}
		</main>
	);
}

const getData = async () => {
	// setting which storage should be using

	const response = await fetch(
		"https://pwa-crew-site-demo.vercel.app/api/events",
		{
			next: { revalidate: 3600 },
		}
	);
	const data = await response.json();

	const events = data.message;
	const eventsSliced = events.slice(0, 3);

	return eventsSliced;
};
