import Logo2 from "@/components/transitions/Logo/Logo";
import WrapperForm from "@/components/transitions/Wrappers/WrapperForm";
import SocialMedia from "@/components/transitions/SocialMedia/SocialMedia";
import styles from "../../../styles/components/Pages/NewEventPage.module.scss";
import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import ImageFill from "@/components/transitions/Image/ImageFill";
import FormikRegister from "@/components/transitions/Forms/FormikRegister/FormikRegister";
import WrapperFormWithContent from "@/components/transitions/Wrappers/WrapperFormWithContent";

const NewEventPage = () => {
	const dataWrapper = {
		title: "Dodaj wydarzenie",
		textFirst: "Bądź na bieżąco!",
		textSecond: "Już teraz osiągnij sukces!",
		imageSrc: "/images/header/concert2.jpg",
		alt: "Concert",
	};
	return (
		<WrapperSection>
			<WrapperFormWithContent
				headingType='h1'
				title={dataWrapper.title}
				textFirst={dataWrapper.textFirst}
				textSecond={dataWrapper.textSecond}
				imageSrc={dataWrapper.imageSrc}
				alt={dataWrapper.alt}></WrapperFormWithContent>
		</WrapperSection>
	);
};

export default NewEventPage;
