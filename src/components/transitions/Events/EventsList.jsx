import styles from "../../../styles/components/transitions/Events/EventsList.module.scss";
import EventItem from "./EventItem";

const DUMMY_DATA = {
	e1: {
		title: "Muzyczna Noc pod Gwiazdami",
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
		title: "Muzyczna Noc pod Gwiazdami",
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

const EventsList = ({ className, children, ...props }) => {
	const classes = `${styles.events} '${className}`;

	return (
		<ul className={classes}>
			<EventItem
				id='e1'
				title={DUMMY_DATA.e1.title}
				date={DUMMY_DATA.e1.date}
				town={DUMMY_DATA.e1.town}
				street={DUMMY_DATA.e1.street}
				codePost={DUMMY_DATA.e1.codePost}
				time={DUMMY_DATA.e1.time}
				image={DUMMY_DATA.e1.image}
			/>
			<EventItem
				id='e2'
				title={DUMMY_DATA.e2.title}
				date={DUMMY_DATA.e2.date}
				town={DUMMY_DATA.e2.town}
				street={DUMMY_DATA.e2.street}
				codePost={DUMMY_DATA.e2.codePost}
				time={DUMMY_DATA.e2.time}
				image={DUMMY_DATA.e2.image}
			/>
			<EventItem
				id='e3'
				title={DUMMY_DATA.e3.title}
				date={DUMMY_DATA.e3.date}
				town={DUMMY_DATA.e3.town}
				street={DUMMY_DATA.e3.street}
				codePost={DUMMY_DATA.e3.codePost}
				time={DUMMY_DATA.e3.time}
				image={DUMMY_DATA.e3.image}
			/>
		</ul>
	);
};

export default EventsList;
