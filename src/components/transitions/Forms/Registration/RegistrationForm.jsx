import styles from "../../../../styles/components/transitions/Forms/Registration/Registration.module.scss";
import Logo2 from "../../Logo/Logo";
import SocialMedia from "../../SocialMedia/SocialMedia";
import Input from "../../Input/Input";
import WrapperInput from "../../Wrappers/WrapperInput";
import IconRender from "@/components/Icons/IconRender";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";

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
				<form>
					<h1>Logowanie</h1>
					<WrapperInput className={styles["logreg-box__input-box"]}>
						<Input
							type='text'
							name='email'
							id='email'
							placeholder='Email'
							arialabel={"Email"}
						/>
						<IconRender variant='email' />
					</WrapperInput>
					<WrapperInput className={styles["logreg-box__input-box"]}>
						<Input
							type='password'
							name='password'
							id='password'
							placeholder='Password'
							arialabel={"Password"}
						/>
						<IconRender variant='lock' />
					</WrapperInput>
					<WrapperInput className={styles["logreg-box__remember-forgot"]}>
						<input type='checkbox' />
						<label>Remember me</label>
						<Link href='/'> Forgot password?</Link>
					</WrapperInput>
					<ButtonMain variant={"btnSkewRight"}> Zaloguj </ButtonMain>

					<p>
						Don't have an account? <Link href='register'>Register</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default RegistrationForm;
