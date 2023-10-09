import "./globals.scss";
import MainHeader from "@/components/Header/MainHeader";
import Footer from "@/components/Footer/Footer";
import BackgroundImageGeneral from "@/components/transitions/Background/BackgroundImageGeneral";
import SessionProvider from "./SessionProvider";
import Notification from "@/components/transitions/Notification/Notification";
import { ReduxProvider } from "@/global/provider";
import { getServerSession } from "next-auth";
import { getDictionaryElements } from "../dictionaries/rest/dictionaries";

export const metadata = {
	title: "PwaCrew - najlepsza muzyka",
	description: "PwaCrew - najlepsza muzyka",
};

export default async function RootLayout({ children, params: { lang } }) {
	const disc = await getDictionaryElements(lang);

	const navTranslation = {
		trl_home: disc.navigation.home,
		trl_events: disc.navigation.events,
		trl_contact: disc.navigation.contact,
		trl_login: disc.navigation.login,
		trl_chat: disc.navigation.chat,
	};

	const session = await getServerSession();

	return (
		<html lang={lang}>
			<body>
				<SessionProvider session={session}>
					<ReduxProvider>
						<MainHeader disc={navTranslation} />
						<BackgroundImageGeneral lang={lang} />
						<Notification />
						{children}
						<Footer />
					</ReduxProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
