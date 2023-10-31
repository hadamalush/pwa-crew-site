import "./globals.scss";
import MainHeader from "@/components/Header/MainHeader";
import Footer from "@/components/Footer/Footer";
import BackgroundImageGeneral from "@/components/transitions/Background/BackgroundImageGeneral";
import SessionProvider from "./SessionProvider";
import Notification from "@/components/transitions/Notification/Notification";
import ModalHandlerServer from "@/components/transitions/Modal/ModalHandlerServer";
import { ReduxProvider } from "@/global/provider";
import { getServerSession } from "next-auth";
import { getDictionaryElements } from "../dictionaries/rest/dictionaries";
import { getDictionaryNotifi } from "../dictionaries/notifications/dictionaries";

export const metadata = {
	title: "PwaCrew - the best music",
	description:
		"Welcome to our music concert website, where you can add, edit, and browse the latest music events. Register to receive notifications about upcoming concerts by your favorite artists. Edit your events and stay up-to-date with the latest music news. Join our music community and enjoy unforgettable concerts!",
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
	const dictNotifi = await getDictionaryNotifi(lang);
	const session = await getServerSession();

	const navTranslation = {
		trl_home: dict.navigation.home,
		trl_events: dict.navigation.events,
		trl_contact: dict.navigation.contact,
		trl_login: dict.navigation.login,
		trl_aboutUs: dict.navigation.aboutUs,
		trl_allEvents: dict.navigation.dropdown.allEvents,
		trl_createEvent: dict.navigation.dropdown.createEvent,
		trl_notifications: dict.navigation.dropdown.notifications,
		trl_settings: dict.navigation.dropdown.settings,
		trl_signOut: dict.navigation.dropdown.signOut,
		trl_account: dict.navigation.dropdown.account,
	};

	const footerTranslation = {
		trl_title: dict.footer.title,
		trl_text: dict.footer.text,
		trl_emailPlaceholder: dict.footer.emailPlaceholder,
		trl_btnSubscribe: dict.footer.btnSubscribe,
		trl_navTitle: dict.footer.nav.title,
		trl_navLink1: dict.footer.nav.link1,
		trl_navLink2: dict.footer.nav.link2,
		trl_navLink3: dict.footer.nav.link3,
		trl_navLink4: dict.footer.nav.link4,
		trl_eventsTitle: dict.footer.events.title,
		trl_eventsLink1: dict.footer.events.link1,
		trl_eventsLink2: dict.footer.events.link2,
		trl_addressTitle: dict.footer.address.title,
		trl_copyright: dict.footer.copyright,
	};

	const translationModalDelete = {
		trl_title: dict.events.deleteEvent.title,
		trl_btn_delete: dict.events.deleteEvent.btn_delete,
		trl_btn_cancel: dict.events.deleteEvent.btn_cancel,
		trl_err: dictNotifi.notifications.deleteEvent.generalError,
	};

	return (
		<html lang={lang}>
			<body>
				<SessionProvider session={session}>
					<ReduxProvider>
						<MainHeader dict={navTranslation} lang={lang} />
						<BackgroundImageGeneral lang={lang} />
						<Notification />
						<ModalHandlerServer lang={lang} dict={translationModalDelete} />
						{modal}
						{children}
						<Footer dict={footerTranslation} />
					</ReduxProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
