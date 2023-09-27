import "./globals.scss";
import MainHeader from "@/components/Header/MainHeader";
import Footer from "@/components/Footer/Footer";
import BackgroundImageGeneral from "@/components/transitions/Background/BackgroundImageGeneral";
import SessionProvider from "./SessionProvider";
import Notification from "@/components/transitions/Notification/Notification";
import { ReduxProvider } from "@/global/provider";
import { getServerSession } from "next-auth";

export const metadata = {
	title: "PwaCrew - najlepsza muzyka",
	description: "PwaCrew - najlepsza muzyka",
};

export default async function RootLayout({ children, url }) {
	const session = await getServerSession();

	console.log(session);
	return (
		<html lang='pl'>
			<body>
				<SessionProvider session={session}>
					<ReduxProvider>
						<MainHeader />
						<BackgroundImageGeneral />
						<Notification />
						{children}
						<Footer />
					</ReduxProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
