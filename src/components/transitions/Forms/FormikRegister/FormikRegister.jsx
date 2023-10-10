"use client";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import CheckboxFormik from "../../Input/CheckboxFormik";
import InputFormik from "../../Input/InputFormik";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { registerSchema } from "@/components/Schemas/FormSchem";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { showResult } from "@/global/notification-slice";

const FormikRegister = ({ className, dict, lang, ...props }) => {
	const loginUrl = lang === "pl" ? "/logowanie" : "/login";
	const router = useRouter();
	const {
		trl_title,
		trl_email,
		trl_password,
		trl_confirmPassword,
		trl_terms,
		trl_btn,
		trl_question,
		trl_questionLink,
	} = dict;

	const classes = `${styles["logreg-box"]} ${className}`;
	const isMediumScreen = useMediaQuery({
		query: "(min-width: 768px)",
	});

	const isClient = typeof window !== "undefined";

	if (!isMediumScreen && isClient) {
		window.scrollTo(0, 100);
	}

	const dispatch = useDispatch(showResult);

	const changeWebstiteHandler = async event => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			router.push(loginUrl);
		}, 500);
	};

	const onSubmit = async (values, actions) => {
		const email = values.email;
		const password = values.password;
		const confirmPassword = values.confirmPassword;
		const terms = values.terms;

		try {
			const response = await fetch("/api/auth/registration", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, confirmPassword, terms }),
			});

			const data = await response.json();

			if (!response.ok) {
				dispatch(
					showResult({
						message: data.message,
						variant: "warning",
					})
				);
				return;
			}
		} catch (error) {
			return;
		}

		dispatch(
			showResult({
				message:
					"Udało się zarejestrować, wysłaliśmy link rejestracyjny na Twój adres email.",
				variant: "success",
			})
		);
		router.push("/");
	};

	return (
		<FormContainerBlur className={classes} id='form'>
			<Formik
				initialValues={{
					email: "",
					password: "",
					confirmPassword: "",
					terms: false,
				}}
				onSubmit={onSubmit}
				validationSchema={registerSchema}>
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
						<InputFormik
							name='confirmPassword'
							placeholder={trl_confirmPassword}
							aria-label={trl_confirmPassword}
							type='password'
						/>

						<CheckboxFormik name='terms' label={trl_terms} type='checkbox' />

						<ButtonMain type='submit' variant={"btnSkewRight"}>
							{trl_btn}
						</ButtonMain>

						<p>
							{trl_question}
							<Link href={`${loginUrl}`} onClick={changeWebstiteHandler}>
								{trl_questionLink}
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</FormContainerBlur>
	);
};

export default FormikRegister;
