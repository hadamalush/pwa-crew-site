import ModalParallel from "@/components/transitions/Modal/ModalParallel";
import { getServerSession } from "next-auth";
import { cache } from "react";

// import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
// import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
// import ModalDelete from "@/components/Tools/DeleteModal";

export default async function DeleteEventModal({ searchParams, ...props }) {
	let dict, dictNotifi;

	const session = await getServerSession();
	const email = session?.user?.email;

	const notifications = await getData(email);

	console.log("NO I JEST: ", notifications);
	// try {
	// 	dict = await getDictionaryElements(lang);
	// 	dictNotifi = await getDictionaryNotifi(lang);
	// } catch (err) {
	// 	console.log(err);
	// }

	return <ModalParallel>dasdasdasdsadsad</ModalParallel>;
}

const getData = cache(async email => {
	const timestamp = Date.now();
	const apiUrl = `http://localhost:3000//api/getNotifications?timestamp=${timestamp}&email=${
		email || null
	}`;
	let notifications;

	try {
		const response = await fetch(apiUrl, {
			next: { revalidate: 0 },
		});

		const data = await response.json();

		notifications = data?.notifications;
	} catch (err) {
		console.log(err);
	}

	return notifications;
});
