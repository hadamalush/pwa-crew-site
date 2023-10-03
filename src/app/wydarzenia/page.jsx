import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import EventsList from "@/components/transitions/Events/EventsList";
import styles from "./page.module.scss";

import { connectDatabaseEvents, connectDb } from "@/lib/mongodb";
import {
	allConvertFromBuffersToBase64,
	allDownloadBuffersMegaNz,
	oneConvertFromBuffersToBase64,
	oneDownloadBuffersMegaNz,
} from "@/lib/storage/storage";
import { generalConfig } from "../../config/gerenalConfig";

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
	// setting which storage should be using
	const storage = generalConfig.downloadImageStorageEvent;

	// let client;

	// try {
	// 	client = await connectDatabaseEvents();
	// } catch (error) {
	// 	console.log(error);
	// }

	// const db = client.db();

	console.log(generalConfig);

	const db = await connectDb();
	const result = await db.collection("AllEvents").find().toArray();

	// const mapMegaLinks = result.map(event => event.image_src_mega);

	// const buffers = await allDownloadBuffersMegaNz(mapMegaLinks);
	// const convertedBuffers = allConvertFromBuffersToBase64(buffers);

	let i = 0;
	const convertedEvenets = Promise.all(
		result.map(async event => {
			let upload = storage[0];

			if (!event[`image_src_${storage[0]}`]) {
				upload = storage[1];
			}

			if (upload === "mega") {
				const buffer = await oneDownloadBuffersMegaNz(event.image_src_mega);
				event.image_src_mega = oneConvertFromBuffersToBase64(buffer);
			}

			const targetSrc = event[`image_src_${upload}`];

			const { _id, image_src_mega, image_src, ...rest } = event;
			i++;

			return {
				id: new Object(_id).toString(),
				targetSrc: targetSrc,
				upload: upload,
				...rest,
			};
		})
	);

	return convertedEvenets;
};
