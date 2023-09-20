import styles from "./page.module.scss";
import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import RegistrationForm from "@/components/transitions/Forms/Registration/RegistrationForm";

export default function RegistrationPage() {
	return (
		<main>
			<WrapperStart className={styles.wrapper}>
				<RegistrationForm />
			</WrapperStart>
		</main>
	);
}
