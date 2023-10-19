import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import EventsList from "@/components/transitions/Events/EventsList";
import styles from "./page.module.scss";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";

export default async function Events({ params: { lang } }) {
	const dict = await getDictionaryElements(lang);

	const translationEvent = {
		trl_startEvent: dict.events.event.startEvent,
		trl_address: dict.events.event.address,
		trl_description: dict.events.event.description,
		trl_btnEventDetails: dict.events.event.btn_seeDetails,
		trl_btnDelete: dict.events.event.btn_delete,
		trl_btnEdit: dict.events.event.btn_edit,
		trl_btnPreviousPage: dict.events.event.btn_previousPage,
	};

	const trl_title = dict.events.title;

	const [events] = await Promise.all([getData()]);

	return (
		<>
			<WrapperSection id='section-events' className={styles["section-events"]}>
				<h1>{trl_title}</h1>
				<EventsList
					events={events}
					className={styles["section-events__list"]}
					lang={lang}
					dict={translationEvent}
				/>
			</WrapperSection>
		</>
	);
}

const getData = async () => {
	const response = await fetch(
		"https://pwa-crew-site-demo.vercel.app/api/events",
		{
			next: { revalidate: 3600 },
			// cache: "no-store",
		}
	);

	const data = await response.json();
	const events = data.message;

	return events;
};
