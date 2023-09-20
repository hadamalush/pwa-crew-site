import styles from "../../../../styles/components/transitions/Forms/Registration/Registration.module.scss";
import Logo2 from "../../Logo/Logo";
import SocialMedia from "../../SocialMedia/SocialMedia";

const RegistrationForm = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Logo2 />
				<div className={styles["content__text"]}>
					<h3>
						Welcome!
						<br />
						<span> To Our New Website.</span>
					</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
						molestiae.
					</p>
					<SocialMedia />
				</div>
			</div>

			<div className={styles["logreg-box"]}>
				<form>dasdasdssssssssss</form>
			</div>
		</div>
	);
};

export default RegistrationForm;
