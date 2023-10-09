import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import WrapperFormWithContent from "@/components/transitions/Wrappers/WrapperFormWithContent";
import styles from "./Common.module.scss";

export default function Layout({ children }) {
	const dataContent = {
		title: "Witamy!",
		textFirst: "Bądź na bieżąco!",
		textSecond: "Już teraz osiągnij sukces!",
		imageSrc: "/images/header/concert.jpg",
		alt: "Ludzie bawiący się pod sceną na koncercie.",
	};

	return (
		<main>
			<WrapperStart className={styles["start"]}>
				<WrapperFormWithContent
					headingType='h3'
					title={dataContent.title}
					textFirst={dataContent.textFirst}
					textSecond={dataContent.textSecond}
					imageSrc={dataContent.imageSrc}
					alt={dataContent.alt}
					className={styles.box}>
					{children}
				</WrapperFormWithContent>
			</WrapperStart>
		</main>
	);
}
