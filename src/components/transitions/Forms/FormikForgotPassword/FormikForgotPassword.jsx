"use client";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import InputFormik from "../../Input/InputFormik";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Formik, Form } from "formik";
import {
	forgotLinkSchema,
	forgotNewPasswordSchema,
} from "@/components/Schemas/FormSchem";
import { useMediaQuery } from "react-responsive";
import { showResult, toggleLoading } from "@/global/notification-slice";
import { useDispatch } from "react-redux";

const FormikForgotPassword = ({
	resetId,
	dict,
	trl_error,
	lang,
	className,
	...props
}) => {
	const registrationUrl = lang === "pl" ? "/rejestracja" : "/registration";
	const {
		trl_title,
		trl_email,
		trl_btnReset,
		trl_question,
		trl_questionLink,
		trl_newPassword,
		trl_confirmPassword,
		trl_code,
		trl_btnChange,
	} = dict;

	//resetForm - it is for check which page is now, for choose right api/route and right form.
	const resetForm = resetId ? true : false;

	const schema = resetForm ? forgotNewPasswordSchema : forgotLinkSchema;

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

	const changeWebstiteHandler = async event => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			router.push(registrationUrl);
		}, 500);
	};

	const onSubmit = async values => {
		dispatchLoading(toggleLoading());

		const email = values?.email;
		const password = values?.password;
		const confirmPassword = values?.confirmPassword;
		const code = values?.code;
		let data;

		const sendData = !resetForm
			? { email: email, status: resetForm, lang }
			: {
					password: password,
					confirmPassword: confirmPassword,
					code: code,
					status: resetForm,
					lang,
			  };

		try {
			const response = await fetch("/api/auth/resetPassword", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(sendData),
			});

			data = await response.json();

			if (!response.ok) {
				dispatchNotification(
					showResult({
						message: data.error + " Kod błędu: " + response.status,
						variant: "warning",
					})
				);
				return;
			}
		} catch (error) {
			dispatchNotification(
				showResult({
					message: trl_error,
					variant: "warning",
				})
			);
			return;
		}

		dispatchNotification(
			showResult({
				message: data.message,
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
					code: resetId,
				}}
				onSubmit={onSubmit}
				validationSchema={schema}>
				{props => (
					<Form>
						<h1>{trl_title}</h1>

						{!resetForm && (
							<InputFormik
								name='email'
								placeholder={trl_email}
								aria-label={trl_email}
								type='text'
							/>
						)}
						{resetForm && (
							<>
								<InputFormik
									name='password'
									placeholder={trl_newPassword}
									aria-label={trl_newPassword}
									type='password'
								/>
								<InputFormik
									name='confirmPassword'
									placeholder={trl_confirmPassword}
									aria-label={trl_confirmPassword}
									type='password'
								/>
								<InputFormik
									name='code'
									placeholder={trl_code}
									aria-label={trl_code}
									type='text'
								/>
							</>
						)}

						<ButtonMain type='submit' variant={"btnSkewRight"}>
							{resetForm ? trl_btnChange : trl_btnReset}
						</ButtonMain>

						<p>
							{trl_question}
							<Link href={`${registrationUrl}`} onClick={changeWebstiteHandler}>
								{trl_questionLink}
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</FormContainerBlur>
	);
};

export default FormikForgotPassword;
