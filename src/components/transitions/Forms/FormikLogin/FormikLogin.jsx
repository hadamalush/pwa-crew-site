"use client";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import InputFormik from "../../Input/InputFormik";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "@/components/Schemas/FormSchem";
import { useDispatch } from "react-redux";
import { logIn } from "../../../../global/session-slice";
import { showResult } from "@/global/notification-slice";

const FormikLogin = ({ className, ...props }) => {
	const router = useRouter();
	const classes = `${styles["logreg-box"]} ${className}`;
	const { data: session, status } = useSession();
	const dispatch = useDispatch(logIn);
	const dispatchNotification = useDispatch(showResult);

	useEffect(() => {
		if (status === "authenticated" && session) {
			dispatch(logIn(session.user));

			router.push("/");
			console.log(session.user);
		}
	}, [session, status]);

	const changeWebstiteHandler = async event => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			router.push("/rejestracja");
		}, 500);
	};

	const onSubmit = async (values, actions) => {
		const email = values.email;
		const password = values.password;

		try {
			const response = await signIn("credentials", {
				redirect: false,
				email: email,
				password: password,
			});

			if (response.error) {
				dispatchNotification(
					showResult({ message: response.error, variant: "warning" })
				);
				return;
			}
		} catch (error) {
			dispatchNotification(
				showResult({
					message: "Coś poszło nie tak. Skontaktuj się z administratorem.",
					variant: "warning",
				})
			);
		}

		dispatchNotification(
			showResult({ message: "Witamy ponownie!", variant: "success" })
		);
	};

	return (
		<div className={classes} id='form'>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				onSubmit={onSubmit}
				validationSchema={loginSchema}>
				{props => (
					<Form>
						<h1>Logowanie</h1>

						<InputFormik
							name='email'
							placeholder='Email'
							aria-label='Email'
							type='text'
						/>
						<InputFormik
							name='password'
							placeholder='Hasło'
							aria-label='Hasło'
							type='password'
						/>

						<ButtonMain type='submit' variant={"btnSkewRight"}>
							{" "}
							Zaloguj{" "}
						</ButtonMain>

						<p>
							Nie masz konta?{" "}
							<Link href='/rejestracja' onClick={changeWebstiteHandler}>
								Zarejestruj
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FormikLogin;
