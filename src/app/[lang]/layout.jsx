import "./globals.scss";
import MainHeader from "@/components/Header/MainHeader";
import Footer from "@/components/Footer/Footer";
import BackgroundImageGeneral from "@/components/transitions/Background/BackgroundImageGeneral";
import SessionProvider from "./SessionProvider";
import Notification from "@/components/transitions/Notification/Notification";
import { ReduxProvider } from "@/global/provider";
import { getServerSession } from "next-auth";
import { getDictionaryElements } from "../dictionaries/rest/dictionaries";
import { cache } from "react";

export const metadata = {
	title: "PwaCrew - najlepsza muzyka",
	description: "PwaCrew - najlepsza muzyka",
};

export default async function RootLayout({
	children,
	params,
	modal,
	...props
}) {
	if (!params) {
		return null;
	}

	const lang = params.lang;
	const dict = await getDictionaryElements(lang);

	const navTranslation = {
		trl_home: dict.navigation.home,
		trl_events: dict.navigation.events,
		trl_contact: dict.navigation.contact,
		trl_login: dict.navigation.login,
		trl_chat: dict.navigation.chat,
		trl_allEvents: dict.navigation.dropdown.allEvents,
		trl_createEvent: dict.navigation.dropdown.createEvent,
		trl_notifications: dict.navigation.dropdown.notifications,
		trl_settings: dict.navigation.dropdown.settings,
		trl_signOut: dict.navigation.dropdown.signOut,
	};

	const session = await getServerSession();
	const email = session?.user?.email;
	let quantityNotices;

	if (email) {
		const result = await getData(email);
		quantityNotices = result?.message;

		console.log(quantityNotices);
	}

	return (
		<html lang={lang}>
			<body>
				<SessionProvider session={session}>
					<ReduxProvider>
						<MainHeader
							dict={navTranslation}
							lang={lang}
							quantityNotices={quantityNotices}
						/>
						<BackgroundImageGeneral lang={lang} />
						<Notification />
						{modal}
						{children}
						<Footer />
					</ReduxProvider>
				</SessionProvider>
			</body>
		</html>
	);
}

const getData = cache(async email => {
	const timestamp = Date.now();
	const apiUrl = `https://pwa-crew-site-demo.vercel.app/api/getStatusNotifications?timestamp=${timestamp}&email=${
		email || null
	}`;
	let quantityNotices;

	try {
		const response = await fetch(apiUrl, {
			next: { revalidate: 600 },
		});

		if (response.ok) {
			quantityNotices = response.json();
		}
	} catch (err) {
		console.log(err);
	}

	return quantityNotices;
});
