import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import WrapperFormWithContent from "@/components/transitions/Wrappers/WrapperFormWithContent";
import FormikEvent from "@/components/transitions/Forms/FormikEvent/FormikEvent";
import styles from "../../../styles/components/Pages/NewEventPage.module.scss";

const NewEventPage = () => {
	const dataWrapper = {
		title: "Dodaj wydarzenie",
		textFirst: "Bądź na bieżąco!",
		textSecond: "Już teraz osiągnij sukces!",
		imageSrc: "/images/header/concert2.jpg",
		alt: "Concert",
	};

	return (
		<WrapperSection className={styles["section__new-event"]} id='formularz'>
			<WrapperFormWithContent
				headingType='h3'
				title={dataWrapper.title}
				textFirst={dataWrapper.textFirst}
				textSecond={dataWrapper.textSecond}
				imageSrc={dataWrapper.imageSrc}
				alt={dataWrapper.alt}
				className={styles.container}>
				<FormikEvent />
			</WrapperFormWithContent>
		</WrapperSection>
	);
};

export default NewEventPage;
