import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import LoginForm from "@/components/transitions/Forms/Login/LoginForm";
import WrapperForm from "@/components/transitions/Wrappers/WrapperForm";
import Logo2 from "@/components/transitions/Logo/Logo";
import SocialMedia from "@/components/transitions/SocialMedia/SocialMedia";
import ImageLoader from "@/components/transitions/Image/ImageRender";
import styles from "../Common.module.scss";

export default function RegistrationPage() {
	return (
		<main>
			<WrapperStart className={styles["login"]}>
				<WrapperForm className={styles["login__container"]}>
					<ImageLoader
						alt='Crowd of people playing on the concert'
						variant='concert'
						sizes={"(max-width: 768px) 90vw, (min-width: 1200px) 70vw"}
					/>
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
