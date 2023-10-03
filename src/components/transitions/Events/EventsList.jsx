"use client";

import { useEffect, useState } from "react";
import styles from "../../../styles/components/transitions/Events/EventsList.module.scss";
import EventItem from "./EventItem";
import { File } from "megajs";

const EventsList = ({ events, className, children, ...props }) => {
	const [image, setImage] = useState();
	const classes = `${styles.events} ${className}`;

	console.log(events);

	// const changeBuffer = async () => {
	// 	const mega_src = events[0].image_src_mega;

	// 	const file = File.fromURL(mega_src);

	// 	await file.loadAttributes();

	// 	const data = await file.downloadBuffer();

	// 	const buffer = Buffer.from(data);

	// 	const base64 = buffer.toString("base64");

	// 	setImage(base64);
	// };

	// useEffect(() => {
	// 	changeBuffer();
	// }, []);

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
					image={event.image_src_mega}
					// image={image}
				/>
			))}
		</ul>
	);
};

export default EventsList;
