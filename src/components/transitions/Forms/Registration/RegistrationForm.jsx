"use client";

import Input from "../../Input/Input";
import WrapperInput from "../../Wrappers/WrapperInput";
import IconRender from "@/components/Icons/IconRender";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import { useRouter } from "next/navigation";

const RegistrationForm = ({ className, ...props }) => {
	const router = useRouter();
	const classes = `${styles["logreg-box"]} ${className}`;

	const changeWebstiteHandler = async event => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			console.log("object");
			router.push("/logowanie");
		}, 500);
	};

	return (
		<div className={classes} id='form'>
			<form>
				<h1>Rejestracja</h1>
				<WrapperInput className={`${styles["logreg-box__input-box"]}`}>
					<Input
						type='text'
						name='email'
						id='email'
						placeholder='Email'
						autoComplete={"email"}
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
						autoComplete={"false"}
						arialabel={"Hasło"}
					/>
					<IconRender variant='lock' />
				</WrapperInput>
				<WrapperInput className={styles["logreg-box__input-box"]}>
					<Input
						type='password'
						name='repeatpassword'
						id='repeatpassword'
						placeholder='Powtórz hasło'
						autoComplete='false'
						arialabel={"Powtórz hasło"}
					/>
					<IconRender variant='lock' />
				</WrapperInput>
				<WrapperInput className={styles["logreg-box__remember-forgot"]}>
					<input type='checkbox' />
					<label>Akceptuje warunki umowy</label>
				</WrapperInput>
				<ButtonMain variant={"btnSkewRight"}> Zaloguj </ButtonMain>

				<p>
					Masz konto?{" "}
					<Link href='/logowanie' onClick={changeWebstiteHandler}>
						Zaloguj
					</Link>
				</p>
			</form>
		</div>
	);
};

export default RegistrationForm;
