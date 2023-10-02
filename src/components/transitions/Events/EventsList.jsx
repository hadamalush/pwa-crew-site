"use client";

import styles from "../../../styles/components/transitions/Events/EventsList.module.scss";
import EventItem from "./EventItem";

const EventsList = ({ events, className, children, ...props }) => {
	const classes = `${styles.events} ${className}`;

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
					image={event.image_src_local}
				/>
			))}
		</ul>
	);
};

export default EventsList;
