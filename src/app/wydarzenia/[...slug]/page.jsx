import EventItem from "@/components/transitions/Events/EventItem";
import { config } from "@/middleware";

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

const EventPage = ({ params }) => {
	const slug = params.slug;
	const eventId = slug[slug.length - 1];
	console.log(slug);
	// const replaced = slug.replaceAll(" ", "-") + "/e2";

	// const lastSlashIndex = replaced.lastIndexOf("/");

	// let fragmentAfterLastSlash = "e1";
	// if (lastSlashIndex !== -1) {
	// 	fragmentAfterLastSlash = replaced.substring(lastSlashIndex + 1);
	// }

	const id1 = DUMMY_DATA[eventId];

	return (
		<EventItem
			id={eventId}
			title={id1.title}
			date={id1.date}
			town={id1.town}
			street={id1.street}
			codePost={id1.codePost}
			time={id1.time}
			image={id1.image}
		/>
	);
};

export default EventPage;
