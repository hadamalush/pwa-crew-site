"use client";
import Input from "../../Input/Input";
import WrapperInput from "../../Wrappers/WrapperInput";
import IconRender from "@/components/Icons/IconRender";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const RegistrationForm = ({ className, ...props }) => {
	const router = useRouter();
	const enteredEmail = useRef();
	const enteredPassword = useRef();
	const repeatedPassword = useRef();

	const classes = `${styles["logreg-box"]} ${className}`;

	const changeWebstiteHandler = async event => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			router.push("/logowanie");
		}, 500);
	};

	const registerHandler = async event => {
		event.preventDefault();

		const email = enteredEmail.current.value;
		const password = enteredPassword.current.value;
		const repeatedPass = repeatedPassword.current.value;

		//zrobic validacje

		const response = await fetch("/api/auth/registration", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password, repeatedPass }),
		});

		const data = await response.json();

		console.log(data);

		// const data = await response.json();

		// console.log(response);

		// try {
		// 	const user = await createUserWithEmailAndPassword(auth, email, password);
		// 	console.log(user);
		// } catch (error) {
		// 	console.log(error.message);
		// }
	};

	return (
		<div className={classes} id='form' onSubmit={registerHandler}>
			<form>
				<h1>Rejestracja</h1>
				<WrapperInput className={`${styles["logreg-box__input-box"]}`}>
					<Input
						id='email'
						reference={enteredEmail}
						name='email'
						type='text'
						placeholder='Email'
						autoComplete='email'
						arialabel={"Email"}
					/>
					<IconRender variant='email' />
				</WrapperInput>
				<WrapperInput className={styles["logreg-box__input-box"]}>
					<Input
						id='password'
						reference={enteredPassword}
						name='password'
						type='password'
						placeholder='Hasło'
						autoComplete={"false"}
						arialabel={"Hasło"}
					/>
					<IconRender variant='lock' />
				</WrapperInput>
				<WrapperInput className={styles["logreg-box__input-box"]}>
					<Input
						id='repeatpassword'
						reference={repeatedPassword}
						name='repeatpassword'
						type='password'
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
