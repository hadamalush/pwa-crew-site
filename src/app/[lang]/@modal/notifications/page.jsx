import ModalParallel from "@/components/transitions/Modal/ModalParallel";
import NotificationList from "@/components/transitions/Notification/NotificationList";
import { getServerSession } from "next-auth";
import { cache } from "react";

export default async function NotificationModal({ params: { lang } }) {
	const session = await getServerSession();
	const email = session?.user?.email;

	const notifications = await getData(email);

	return (
		<ModalParallel path='notifications'>
			<NotificationList notifications={notifications} lang={lang} />
		</ModalParallel>
	);
}

const getData = cache(async email => {
	const timestamp = Date.now();
	const apiUrl = `https://pwa-crew-site-demo.vercel.app/api/getNotifications?timestamp=${timestamp}&email=${
		email || null
	}`;
	let notifications;

	try {
		const response = await fetch(apiUrl, {
			next: { revalidate: 10 },
		});

		const data = await response.json();

		notifications = data?.notifications;
	} catch (err) {
		console.log(err);
	}

	return notifications;
});
