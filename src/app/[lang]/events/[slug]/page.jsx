import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import EventItem from "@/components/transitions/Events/EventItem";
import ImgBgBlur from "@/components/transitions/Image/ImgBgBlur";

import styles from "../../../../styles/components/Pages/EventPage.module.scss";
import { generalConfig } from "@/config/gerenalConfig";
import { connectDatabaseEvents, findDocument } from "@/lib/mongodb";
import {
	oneConvertFromBuffersToBase64,
	oneDownloadBuffersMegaNz,
} from "@/lib/storage/storage";
import { ObjectId } from "mongodb";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";

const EventPage = async ({ params: { slug, lang }, edit }) => {
	const dict = await getDictionaryElements(lang);

	const eventId = slug.substring(slug.lastIndexOf("-") + 1);
	let event;
	try {
		event = await getEvent(eventId);
	} catch (err) {
		console.log(err);
	}

	if (!event || event.error) {
		throw new Error("No result found");
	}

	const {
		title,
		town,
		code_post,
		street,
		date,
		time,
		description,
		user_email,
		targetSrc,
		uploadStorage,
	} = event?.message ? event.message : null;

	const translationEvent = {
		trl_startEvent: dict.events.event.startEvent,
		trl_address: dict.events.event.address,
		trl_description: dict.events.event.description,
		trl_btnEventDetails: dict.events.event.btn_seeDetails,
		trl_btnDelete: dict.events.event.btn_delete,
		trl_btnEdit: dict.events.event.btn_edit,
		trl_btnPreviousPage: dict.events.event.btn_previousPage,
	};

	return (
		<WrapperSection
			className={styles["section-detail"]}
			id='section_detail-event'>
			{event.message && (
				<>
					<h1>{title}</h1>
					<ImgBgBlur
						src={targetSrc}
						className={styles["section-detail__img"]}
					/>
					<EventItem
						id={eventId}
						title={title}
						date={date}
						town={town}
						street={street}
						codePost={code_post}
						time={time}
						description={description}
						image={targetSrc}
						upload={uploadStorage}
						owner={user_email}
						dict={translationEvent}
						lang={lang}
						className={styles["section-detail__item"]}
					/>
				</>
			)}
		</WrapperSection>
	);
};

const getEvent = async eventId => {
	let data;

	const apiUrl = `https://pwa-crew-site-demo.vercel.app/api/event?eventId=${eventId}`;

	try {
		const response = await fetch(apiUrl);

		data = await response.json();

		if (!response) {
			return { error: "Page not found" };
		}
	} catch (error) {
		return { error: "Something went wrong" };
	}

	return data;
};

export default EventPage;
