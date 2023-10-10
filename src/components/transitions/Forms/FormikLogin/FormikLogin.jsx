"use client";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import InputFormik from "../../Input/InputFormik";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "@/components/Schemas/FormSchem";
import { useMediaQuery } from "react-responsive";
import { showResult, toggleLoading } from "@/global/notification-slice";
import { useDispatch } from "react-redux";

const FormikLogin = ({ className, dict, lang, ...props }) => {
	console.log(lang);
	const registrationUrl = lang === "pl" ? "/rejestracja" : "/registration";
	const forgotPassUrl =
		lang === "pl" ? "/zapomniane-haslo" : "/forgot-password";

	console.log("check: ", forgotPassUrl);
	const {
		trl_title,
		trl_email,
		trl_password,
		trl_forgotPass,
		trl_btn,
		trl_question,
		trl_questionLink,
	} = dict;

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
			router.push("/");
		}
	}, [session, status]);

	const changeWebstiteHandler = async (website, event) => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			router.push(`${website}`);
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
		<FormContainerBlur className={classes} id='form'>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				onSubmit={onSubmit}
				validationSchema={loginSchema}>
				{props => (
					<Form>
						<h1>{trl_title}</h1>

						<InputFormik
							name='email'
							placeholder={trl_email}
							aria-label={trl_email}
							type='text'
						/>
						<InputFormik
							name='password'
							placeholder={trl_password}
							aria-label={trl_password}
							type='password'
						/>

						<Link
							href={`${forgotPassUrl}`}
							onClick={changeWebstiteHandler.bind(null, forgotPassUrl)}>
							{trl_forgotPass}
						</Link>

						<ButtonMain type='submit' variant={"btnSkewRight"}>
							{trl_btn}
						</ButtonMain>

						<p>
							{trl_question}
							<Link
								href={`${registrationUrl}`}
								onClick={changeWebstiteHandler.bind(null, registrationUrl)}>
								{trl_questionLink}
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</FormContainerBlur>
	);
};

export default FormikLogin;
