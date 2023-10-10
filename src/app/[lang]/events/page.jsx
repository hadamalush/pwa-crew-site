import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import EventsList from "@/components/transitions/Events/EventsList";
import styles from "./page.module.scss";

import { connectDatabaseEvents, connectDb } from "@/lib/mongodb";
import {
	oneConvertFromBuffersToBase64,
	oneDownloadBuffersMegaNz,
} from "@/lib/storage/storage";
import { generalConfig } from "../../../config/gerenalConfig";

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

	const db = await connectDb();
	const result = await db.collection("AllEvents").find().toArray();

	const convertedEvenets = Promise.all(
		result.map(async event => {
			let uploadStorage = storage[0];

			//If is empty using second storage
			if (!event[`image_src_${storage[0]}`]) {
				uploadStorage = storage[1];
			}

			//Mega links need to download buffer and then convert to base64

			try {
				if (uploadStorage === "mega") {
					const buffer = await oneDownloadBuffersMegaNz(event.image_src_mega);
					event.image_src_mega = oneConvertFromBuffersToBase64(buffer);
				}
			} catch (err) {
				//set default picture - info
				console.log(err);
			}

			const targetSrc = event[`image_src_${uploadStorage}`];

			const { _id, image_src_mega, image_src_vercelBlob, ...rest } = event;

			return {
				id: new Object(_id).toString(),
				targetSrc: targetSrc,
				upload: uploadStorage,
				...rest,
			};
		})
	);

	return convertedEvenets;
};
