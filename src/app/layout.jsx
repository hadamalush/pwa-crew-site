import "./globals.scss";
import MainHeader from "@/components/Header/MainHeader";
import Footer from "@/components/Footer/Footer";
import BackgroundImageGeneral from "@/components/transitions/Background/BackgroundImageGeneral";
import { AuthProvider } from "./Providers";

export const metadata = {
	title: "PwaCrew - najlepsza muzyka",
	description: "PwaCrew - najlepsza muzyka",
};

export default function RootLayout({ children }) {
	return (
		<html lang='pl'>
			<body>
				<AuthProvider>
					<MainHeader newsletter={true} />
					<BackgroundImageGeneral />
					{children}
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}
