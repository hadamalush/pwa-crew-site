import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import EventsList from "@/components/transitions/Events/EventsList";
import styles from "./page.module.scss";

import { connectDatabaseEvents, connectDb } from "@/lib/mongodb";
import {
	oneConvertFromBuffersToBase64,
	oneDownloadBuffersMegaNz,
} from "@/lib/storage/storage";
import { generalConfig } from "../../../config/gerenalConfig";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";

export default async function Events({ params: { lang } }) {
	const dict = await getDictionaryElements(lang);
	const trl_title = dict.events.title;
	const trl_btnEventDetails = dict.events.event.btn_seeDetails;
	const trl_startEvent = dict.events.event.startEvent;

	const [events] = await Promise.all([getData()]);

	return (
		<>
			<WrapperSection className={styles["section-events"]}>
				<h1>{trl_title}</h1>
				<EventsList
					events={events}
					className={styles["section-events__list"]}
					lang={lang}
					trl_btnEventDetails={trl_btnEventDetails}
					trl_startEvent={trl_startEvent}
				/>
			</WrapperSection>
		</>
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

	return events;
};
