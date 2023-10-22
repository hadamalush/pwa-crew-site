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

	if (eventId.length !== 24) {
		return <p>Nie znaleziono takiego wydarzenia.</p>;
	}

	let modifiedEventId;
	try {
		modifiedEventId = new ObjectId(eventId);
	} catch (error) {
		return <p>Nie poprawny adres.</p>;
	}

	let client, result;
	try {
		client = await connectDatabaseEvents();
	} catch (error) {
		console.log(error);
	}

	try {
		result = await findDocument(client, "AllEvents", { _id: modifiedEventId });

		if (!result) {
			return <p>Nie ma takiego wydarzenia.</p>;
		}
	} catch (error) {
		console.log("ERROR: ", error);
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
	} = result;

	const translationEvent = {
		trl_startEvent: dict.events.event.startEvent,
		trl_address: dict.events.event.address,
		trl_description: dict.events.event.description,
		trl_btnEventDetails: dict.events.event.btn_seeDetails,
		trl_btnDelete: dict.events.event.btn_delete,
		trl_btnEdit: dict.events.event.btn_edit,
		trl_btnPreviousPage: dict.events.event.btn_previousPage,
	};

	const storage = generalConfig.downloadImageStorageEvent;
	let uploadStorage = storage[0];

	if (!result[`image_src_${storage[0]}`]) {
		uploadStorage = storage[1];
	}

	try {
		if (uploadStorage === "mega") {
			const buffer = await oneDownloadBuffersMegaNz(result.image_src_mega);
			result.image_src_mega = oneConvertFromBuffersToBase64(buffer);
		}
	} catch (err) {
		//set default picture - info
		console.log(err);
	}

	const targetSrc = result[`image_src_${uploadStorage}`];

	return (
		<WrapperSection
			className={styles["section-detail"]}
			id='section_detail-item'>
			<h1>{title}</h1>
			<ImgBgBlur src={targetSrc} className={styles["section-detail__img"]} />
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
		</WrapperSection>
	);
};

export default EventPage;
