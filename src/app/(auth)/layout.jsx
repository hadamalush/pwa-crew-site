import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import WrapperForm from "@/components/transitions/Wrappers/WrapperForm";
import Logo2 from "@/components/transitions/Logo/Logo";
import SocialMedia from "@/components/transitions/SocialMedia/SocialMedia";
import ImageLoader from "@/components/transitions/Image/ImageRender";
import styles from "./Common.module.scss";
import WrapperFormWithContent from "@/components/transitions/Wrappers/WrapperFormWithContent";

export default function Layout({ children }) {
	const dataContent = {
		title: "Witamy!",
		textFirst: "Bądź na bieżąco!",
		textSecond: "Już teraz osiągnij sukces!",
		imageSrc: "/images/header/concert.jpg",
		alt: "Concert",
	};

	return (
		<main>
			<WrapperStart className={styles["login"]} id='#login'>
				<WrapperFormWithContent
					headingType='h3'
					title={dataContent.title}
					textFirst={dataContent.textFirst}
					textSecond={dataContent.textFirst}
					imageSrc={dataContent.imageSrc}
					alt={dataContent.alt}>
					{children}
				</WrapperFormWithContent>
			</WrapperStart>
		</main>
	);
}
