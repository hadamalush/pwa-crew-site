import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import WrapperFormWithContent from "@/components/transitions/Wrappers/WrapperFormWithContent";
import FormikContact from "@/components/transitions/Forms/FormikContact/FormikContact";
import styles from "../../../styles/components/Pages/ContactPage.module.scss";

export default function ContactPage() {
	const dataContent = {
		title: "Skontaktuj się z nami!",
		textFirst: "Już teraz!",
		textSecond: "Już teraz osiągnij sukces!",
		imageSrc: "/images/background/background-contact.jpg",
		alt: "Concert",
	};

	return (
		<main>
			<WrapperStart className={styles["start"]}>
				<WrapperFormWithContent
					headingType='h3'
					title={dataContent.title}
					textFirst={dataContent.textFirst}
					textSecond={dataContent.textFirst}
					imageSrc={dataContent.imageSrc}
					alt={dataContent.alt}
					className={styles.box}>
					<FormikContact />
				</WrapperFormWithContent>
			</WrapperStart>
		</main>
	);
}
