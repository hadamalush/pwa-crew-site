import EventItem from "@/components/transitions/Events/EventItem";
import { generalConfig } from "@/config/gerenalConfig";
import { connectDatabaseEvents, findDocument } from "@/lib/mongodb";
import {
	oneConvertFromBuffersToBase64,
	oneDownloadBuffersMegaNz,
} from "@/lib/storage/storage";
import { ObjectId } from "mongodb";

const DUMMY_DATA = {
	e1: {
		title: "Muzyczna Noc pod.Gwiazdami",
		date: "18.03.2023",
		town: "Warsaw",
		street: "Aleja Wyzwolenia 78",
		codePost: "03-990",
		time: "18:30",
		image: "/images/events/audience.jpg",
		description:
			"Podczas Muzycznej Nocy pod gwiazdami, tłum zgromadził się w otoczeniu nocnego nieba. Artystyczne dźwięki i wokalne talenty wypełniły powietrze, tworząc magiczną atmosferę. Gwiazdy lśniły na tle ciemnego nieba, a ludzie tańczyli i śpiewali, zatapiając się w niezapomnianej nocy pełnej muzyki i emocji.",
	},
	e2: {
		title: "Rockowa Eksplozja Energii",
		date: "27.12.2024",
		town: "Pilawa",
		street: "Aleja Wyzwolenia 78",
		codePost: "01-770",
		time: "08:30",
		image: "/images/events/confetti.jpg",
		description:
			"Podczas Rockowej Eksplozji Energii, scena rozpłonęła się energią, jak wulkan muzyki. Gitary wyłamujące się z mocy wzmacniaczy, wokalista niesiony tłumem, a publiczność wybuchającą ekscytacją. To był niezapomniany spektakl, w którym muzyka wypaliła się na scenie, pozostawiając wszystkich w ekstatycznym transie.",
	},
	e3: {
		title: "Klasyka w nowoczesnym Wydaniu",
		date: "28.05.2023",
		town: "Krakow",
		street: "Aleja Wyzwolenia 78",
		codePost: "03-101",
		time: "20:30",
		image: "/images/events/woman.jpg",
		description:
			"Na scenie Klasyka w Nowoczesnym Wydaniu, tradycyjne utwory ożywały w nowatorskich aranżacjach. Muzyka przekształcona przez nowoczesne brzmienia, łącząc przeszłość z teraźniejszością, tworząc niepowtarzalne doświadczenie muzyczne, które zachwyciło zarówno miłośników klasyki, jak i nowoczesnych dźwięków.",
	},
};

const EventPage = async ({ params }) => {
	const slug = params.slug;
	const eventId = slug[slug.length - 1];

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

	const { title, town, code_post, street, date, time, description } = result;

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
		/>
	);
};

export default EventPage;
