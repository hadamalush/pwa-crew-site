import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import WrapperFormWithContent from "@/components/transitions/Wrappers/WrapperFormWithContent";
import styles from "./Common.module.scss";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";

export default async function Layout({ children, params: { lang } }) {
	const dict = await getDictionaryElements(lang);

	const dataContent = {
		trl_title: dict.auth.wp_content.title,
		trl_textFirst: dict.auth.wp_content.textFirst,
		trl_textSecond: dict.auth.wp_content.textSecond,
		imageSrc: "/images/header/concert.jpg",
		trl_alt: dict.auth.wp_content.alt,
	};

	return (
		<main>
			<WrapperStart className={styles["start"]}>
				<WrapperFormWithContent
					headingType='h3'
					title={dataContent.trl_title}
					textFirst={dataContent.trl_textFirst}
					textSecond={dataContent.trl_textSecond}
					imageSrc={dataContent.imageSrc}
					alt={dataContent.trl_alt}
					className={styles.box}>
					{children}
				</WrapperFormWithContent>
			</WrapperStart>
		</main>
	);
}
