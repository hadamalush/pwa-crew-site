import "./globals.scss";
import MainHeader from "@/components/Header/MainHeader";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";


export const metadata = {
	title: "PwaCrew - najlepsza muzyka",
	description: "PwaCrew - najlepsza muzyka",
};

export default function RootLayout({ children }) {
	return (
		<html lang='pl'>
			<body>
				<MainHeader newsletter={true} />
				<div className='hero'>
					<Image
						alt='Crowd on the concert'
						src='/images/header/concert.jpg'
						width={0}
						height={0}
						fill
						sizes='100vw'
					/>
					<div className='hero__bg'></div>
				</div>
				{children}
				<Footer />
			</body>
		</html>
	);
}
