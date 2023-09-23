"use client";
import Input from "../../Input/Input";
import WrapperInput from "../../Wrappers/WrapperInput";
import IconRender from "@/components/Icons/IconRender";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../../../global/session-slice";

const LoginForm = ({ className, ...props }) => {
	const router = useRouter();
	const enteredEmail = useRef();
	const enteredPassword = useRef();

	const dispatch = useDispatch(logIn);
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === "authenticated" && session) {
			dispatch(logIn(session.user));

			router.push("/");
			console.log(session.user);
		}
	}, [session, status]);

	const classes = `${styles["logreg-box"]} ${className}`;

	const changeWebstiteHandler = async event => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			router.replace("/rejestracja");
		}, 500);
	};

	const loginHandler = async event => {
		event.preventDefault();

		const email = enteredEmail.current.value;
		const password = enteredPassword.current.value;
		let response;
		try {
			response = await signIn("credentials", {
				redirect: false,
				email: email,
				password: password,
			});
		} catch (error) {
			console.log(error);
		}

		if (response.error) {
			console.log("error occured");
		}
	};

	return (
		<div className={classes} id={"form"}>
			<form onSubmit={loginHandler}>
				<h1>Logowanie</h1>
				<WrapperInput className={styles["logreg-box__input-box"]}>
					<Input
						id='email'
						reference={enteredEmail}
						name='email'
						type='text'
						placeholder='Email'
						autoComplete='off'
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
						placeholder='Password'
						autoComplete='off'
						arialabel={"Password"}
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
					Nie masz konta?{" "}
					<Link href='/rejestracja' onClick={changeWebstiteHandler}>
						Zarejestruj
					</Link>
				</p>
			</form>
		</div>
	);
};

export default LoginForm;
