import "./globals.scss";
import MainHeader from "@/components/Header/MainHeader";
import Footer from "@/components/Footer/Footer";
import BackgroundImageGeneral from "@/components/transitions/Background/BackgroundImageGeneral";
import { AuthProvider } from "./Providers";
import { ReduxProvider } from "@/global/provider";
import Notification from "@/components/transitions/Notification/Notification";

export const metadata = {
	title: "PwaCrew - najlepsza muzyka",
	description: "PwaCrew - najlepsza muzyka",
};

export default function RootLayout({ children }) {
	return (
		<html lang='pl'>
			<body>
				<AuthProvider>
					<ReduxProvider>
						<MainHeader newsletter={true} />
						<BackgroundImageGeneral />
						<Notification />
						{children}
						<Footer />
					</ReduxProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
