import Logo2 from "@/components/transitions/Logo/Logo";
import WrapperForm from "@/components/transitions/Wrappers/WrapperForm";
import SocialMedia from "@/components/transitions/SocialMedia/SocialMedia";
import styles from "../../../styles/components/Pages/NewEventPage.module.scss";
import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import ImageFill from "@/components/transitions/Image/ImageFill";
import FormikRegister from "@/components/transitions/Forms/FormikRegister/FormikRegister";

const NewEventPage = () => {
	return (
		<WrapperSection>
			<WrapperForm className={styles["login__container"]}>
				<ImageFill src='/images/header/concert2.jpg' />
				<div className={styles["login__content"]}>
					<Logo2 />
					<div className={styles["login__content-text"]}>
						<h3>
							Dodaj wydarzenie
							<br />
							<span> Bądź na bieżąco! </span>
						</h3>
						<p>Już teraz osiągnij sukces!</p>
						<SocialMedia />
					</div>
				</div>
				<FormikRegister />
			</WrapperForm>
		</WrapperSection>
	);
};

export default NewEventPage;
