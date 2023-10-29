"use client";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import InputFormik from "../../Input/InputFormik";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Formik, Form } from "formik";
import { loginSchema } from "@/components/Schemas/FormSchem";
import { showResult, loading } from "@/global/notification-slice";

/**
 * @description This component returns form for login.
 * @param {String} className Enter some class as String
 * @param {Object} dict Enter object with dictionary, that object should include (trl_title,trl_email, trl_password, trl_forgotPass, trl_btn, trl_question, trl_questionLink). All of properties are type of string. For example: trl_title: "Sign in" or trl_title: "Logowanie". Should come from internationalization directory.
 * @param {Object} dictNotifi Enter object with notification dictionary, that object should include (trl_err_404,trl_err_422, trl_generalError, trl_welcome). All of properties are type of string. For example: trl_generalError: in eng - "Something went wrong" or in pl - "Coś poszło nie tak". Should come from internationalization directory.
 * @param {String} lang Enter lang as String. For example: 'pl' or 'en' - but should come from params.
 * @returns Reuturns the whole form component. Should be wrapped with WrapperFormWithContent. However if you want you can pass this component without that wrapper.
 */

const FormikLogin = ({ className, dict, dictNotifi, lang, ...props }) => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const dispatch = useDispatch();

	const {
		trl_title,
		trl_email,
		trl_password,
		trl_forgotPass,
		trl_btn,
		trl_question,
		trl_questionLink,
	} = dict;

	const { trl_err_404, trl_err_422, trl_generalError, trl_welcome } =
		dictNotifi;

	const classes = `${styles["logreg-box"]} ${className || ""}`;
	const isMediumScreen = useMediaQuery({
		query: "(min-width: 768px)",
	});

	useEffect(() => {
		if (!isMediumScreen) {
			window.scrollTo(0, 70);
		} else if (isMediumScreen) {
			window.scrollTo(0, 0);
		}
	}, []);

	const changeWebstiteHandler = (event, path) => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			router.push(path);
		}, 500);
	};

	const onSubmit = async values => {
		const email = values.email;
		const password = values.password;
		dispatch(loading(true));

		try {
			const response = await signIn("credentials", {
				redirect: false,
				email: email,
				password: password,
				lang: lang,
			});

			const selectedErr = response.error === "404" ? trl_err_404 : trl_err_422;

			if (response.error) {
				dispatch(loading(false));
				dispatch(showResult({ message: selectedErr, variant: "warning" }));
				return;
			}
		} catch (error) {
			dispatch(loading(false));
			dispatch(
				showResult({
					message: trl_generalError,
					variant: "warning",
				})
			);
		}
		dispatch(loading(false));
		dispatch(showResult({ message: trl_welcome, variant: "success" }));
		router.push("/?refresh=true");
	};

	return (
		<FormContainerBlur className={classes} id='form'>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				onSubmit={onSubmit}
				validationSchema={loginSchema(lang)}>
				{({ isSubmitting, ...props }) => (
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
							href={"/forgot-password"}
							onClick={event =>
								changeWebstiteHandler(event, "/forgot-password")
							}>
							{trl_forgotPass}
						</Link>

						<ButtonMain
							type='submit'
							disabled={isSubmitting}
							animation={!isSubmitting}>
							{trl_btn}
						</ButtonMain>

						<p>
							{trl_question}
							<Link
								href='/registration'
								onClick={event =>
									changeWebstiteHandler(event, "/registration")
								}>
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
