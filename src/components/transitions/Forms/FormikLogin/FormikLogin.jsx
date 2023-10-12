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

const FormikLogin = ({ className, dict, dictNotifi, lang, ...props }) => {
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
		dispatchLoading(toggleLoading());

		try {
			const response = await signIn("credentials", {
				redirect: false,
				email: email,
				password: password,
				lang: lang,
			});

			const selectedErr = response.error === "404" ? trl_err_404 : trl_err_422;

			if (response.error) {
				dispatchNotification(
					showResult({ message: selectedErr, variant: "warning" })
				);
				dispatchLoading(toggleLoading());
				return;
			}
		} catch (error) {
			dispatchNotification(
				showResult({
					message: trl_generalError,
					variant: "warning",
				})
			);
			dispatchLoading(toggleLoading());
		}

		dispatchNotification(
			showResult({ message: trl_welcome, variant: "success" })
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
				validationSchema={loginSchema(lang)}>
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
							href={"/forgot-password"}
							onClick={event =>
								changeWebstiteHandler(event, "/forgot-password")
							}>
							{trl_forgotPass}
						</Link>

						<ButtonMain type='submit' variant={"btnSkewRight"}>
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
