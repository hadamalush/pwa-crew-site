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
import { useMediaQuery } from "react-responsive";
import { showResult, toggleLoading } from "@/global/notification-slice";
import { useDispatch } from "react-redux";

const FormikLogin = ({ className, ...props }) => {
	const router = useRouter();
	const classes = `${styles["logreg-box"]} ${className}`;
	const { data: session, status } = useSession();
	const isMediumScreen = useMediaQuery({
		query: "(min-width: 768px)",
	});

	const isClient = typeof window !== "undefined";

	if (!isMediumScreen && isClient) {
		window.scrollTo(0, 100);
	}

	const dispatchLoading = useDispatch(toggleLoading);
	const dispatchNotification = useDispatch(showResult);

	useEffect(() => {
		if (status === "authenticated" && session) {
			console.log("loginsave");

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

	const onSubmit = async values => {
		const email = values.email;
		const password = values.password;
		dispatchLoading(toggleLoading());

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
				dispatchLoading(toggleLoading());
				return;
			}
		} catch (error) {
			dispatchNotification(
				showResult({
					message: "Coś poszło nie tak. Skontaktuj się z administratorem.",
					variant: "warning",
				})
			);
			dispatchLoading(toggleLoading());
		}

		dispatchNotification(
			showResult({ message: "Witamy ponownie!", variant: "success" })
		);
		dispatchLoading(toggleLoading());
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
