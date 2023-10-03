import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import EventsList from "@/components/transitions/Events/EventsList";
import styles from "./page.module.scss";

import { connectDatabaseEvents, connectDb } from "@/lib/mongodb";
import { File } from "megajs";
import { convertFromBuffersToBase64, downloadBuffersMegaNz } from "@/lib/store";

export default async function Events() {
	const [events] = await Promise.all([getData()]);

	return (
		<>
			<WrapperSection className={styles["section-events"]}>
				<h1>Wydarzenia</h1>
				<EventsList
					events={events}
					className={styles["section-events__list"]}
				/>
			</WrapperSection>
		</>
	);
}

const getData = async () => {
	// let client;

	// try {
	// 	client = await connectDatabaseEvents();
	// } catch (error) {
	// 	console.log(error);
	// }

	// const db = client.db();

	const db = await connectDb();
	const result = await db.collection("AllEvents").find().toArray();

	const mapMegaLinks = result.map(event => event.image_src_mega);

	const buffers = await downloadBuffersMegaNz(mapMegaLinks);

	const convertedBuffers = convertFromBuffersToBase64(buffers);

	let i = 0;
	const convertedEvenets = result.map(event => {
		i++;
		const { _id, image_src_mega, ...rest } = event;
		return {
			id: new Object(_id).toString(),
			image_src_mega: convertedBuffers[i - 1],
			...rest,
		};
	});

	return convertedEvenets;
};
