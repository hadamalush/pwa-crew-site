import "./globals.scss";
import MainHeader from "@/components/Header/MainHeader";
import Image from "next/image";

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
						alt='dasd'
						src='/images/header/header-img.jpg'
						width={0}
						height={0}
						fill
						sizes='100vw'
					/>
				</div>
				{children}
			</body>
		</html>
	);
}
