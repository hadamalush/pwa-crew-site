import "./globals.scss";
import NavbarDesktop from "@/components/Navigation/NavbarDesktop";
import NavbarMobile from "@/components/Navigation/NavbarMobile";
import MainHeader from "@/components/Header/MainHeader";
export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang='pl'>
			<body>
				<MainHeader>
					<NavbarDesktop />
					<NavbarMobile />
				</MainHeader>

				{children}
			</body>
		</html>
	);
}
