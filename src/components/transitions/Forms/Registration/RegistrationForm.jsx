import styles from "../../../../styles/components/transitions/Forms/Login/LoginForm.module.scss";
import Input from "../../Input/Input";
import WrapperInput from "../../Wrappers/WrapperInput";
import IconRender from "@/components/Icons/IconRender";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";

const RegistrationForm = ({ className, ...props }) => {
	const classes = `${styles["logreg-box"]} ${className}`;

	return (
		<div className={classes}>
			<form>
				<h1>Rejestracja</h1>
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
						placeholder='Hasło'
						arialabel={"Hasło"}
					/>
					<IconRender variant='lock' />
				</WrapperInput>
				<WrapperInput className={styles["logreg-box__input-box"]}>
					<Input
						type='password'
						name='password'
						id='password'
						placeholder='Powtórz hasło'
						arialabel={"Powtórz hasło"}
					/>
					<IconRender variant='lock' />
				</WrapperInput>
				<WrapperInput className={styles["logreg-box__remember-forgot"]}>
					<input type='checkbox' />
					<label>Pamiętaj</label>
					<Link href='/'> Zapomniałeś hasła?</Link>
				</WrapperInput>
				<ButtonMain variant={"btnSkewRight"}> Zaloguj </ButtonMain>

				<p>
					Masz konto? <Link href='/logowanie'>Zaloguj</Link>
				</p>
			</form>
		</div>
	);
};

export default RegistrationForm;
