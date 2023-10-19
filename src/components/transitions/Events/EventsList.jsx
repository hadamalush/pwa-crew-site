"use client";

import styles from "../../../styles/components/transitions/Events/EventsList.module.scss";
import EventItem from "./EventItem";
import EventItem1 from "./EventItem1";

const EventsList = ({ events, className, children, lang, dict, ...props }) => {
	const classes = `${styles.events} ${className}`;

	return (
		<ul className={classes}>
			{events.map(event => (
				<EventItem1
					key={event.id}
					id={event.id}
					title={event.title}
					date={event.date}
					town={event.town}
					street={event.street}
					codePost={event.code_post}
					time={event.time}
					image={event.targetSrc}
					upload={event.upload}
					lang={lang}
					dict={dict}
				/>
			))}
		</ul>
	);
};

export default EventsList;
