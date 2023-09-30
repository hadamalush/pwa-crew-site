import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import EventsList from "@/components/transitions/Events/EventsList";
import { connectDatabaseEvents } from "@/lib/mongodb";

import styles from "./page.module.scss";

export default async function Events() {
	const [events] = await Promise.all([getData()]);

	return (
		<>
			<WrapperSection className={styles["section-events"]}>
				<h1>Wydarzenia</h1>
				<EventsList events={events} />
			</WrapperSection>
		</>
	);
}

const getData = async () => {
	let client;

	try {
		client = await connectDatabaseEvents();
	} catch (error) {
		console.log(error);
	}

	const db = client.db();

	const result = await db.collection("AllEvents").find().toArray();

	const convertedEvenets = result.map(event => {
		const { _id, ...rest } = event;
		return { id: new Object(_id).toString(), ...rest };
	});

	return convertedEvenets;
};
