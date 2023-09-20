import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import LoginForm from "@/components/transitions/Forms/Login/LoginForm";
import WrapperForm from "@/components/transitions/Wrappers/WrapperForm";
import Logo2 from "@/components/transitions/Logo/Logo";
import SocialMedia from "@/components/transitions/SocialMedia/SocialMedia";
import styles from "../Common.module.scss";

export default function RegistrationPage() {
	return (
		<main>
			<WrapperStart className={styles["login"]}>
				<WrapperForm className={styles["login__container"]}>
					<div className={styles["login__content"]}>
						<Logo2 />
						<div className={styles["login__content-text"]}>
							<h3>
								Witamy!
								<br />
								<span> Na Naszej Stronie Internetowej.</span>
							</h3>
							<p>Dołącz do nas i ciesz się razem z nami!</p>
							<SocialMedia />
						</div>
					</div>
					<LoginForm className={styles["login__form"]} />
				</WrapperForm>
			</WrapperStart>
		</main>
	);
}
