"use client";
import styles from "../../../styles/components/transitions/Events/EventsList.module.scss";
import EventItem from "./EventItem";
import { passiveSupport } from "passive-events-support/src/utils";

const EventsList = ({ events, className, children, lang, dict, ...props }) => {
	const classes = `${styles.events} ${className}`;

	passiveSupport({
		debug: true,
	});

	return (
		<ul className={classes}>
			{events.map(event => (
				<EventItem
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
