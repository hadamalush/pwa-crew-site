"use client";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import InputFormik from "../../Input/InputFormik";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
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

/**
 * @description This component returns form for forgot-password with reset link or reset-password. Info: If you want use form with just link you have to forwards this params: dict, trl_error,lang or if you want form with reset password you should forwards in addition resetId - should come from url param.
 * @param {String} className Enter some class as String
 * @param {Object} dict Enter object with dictionary, that object should include (trl_title,trl_email, trl_btnReset, trl_question, trl_questionLink, trl_newPassword, trl_confirmPassword, trl_code, trl_btnChange). All of properties are type of string. For example: trl_title: "Sign up" or trl_title: "Rejestracja". Should come from internationalization directory.
 * @param {String} lang Enter lang as String. For example: 'pl' or 'en' - but should come from params.
 * @param {String} trl_error Enter dictionary of error - will be visible in notifications if an error occurs. For example: in eng: 'Something went wrong...' or in pl 'Coś poszło nie tak'. Should come from nextjs internationalization directory.
 * @returns Reuturns the whole form component. Should be wrapped with WrapperFormWithContent. However if you want you can pass this component without that wrapper.
 */

const FormikForgotPassword = ({
	resetId,
	dict,
	trl_error,
	lang,
	className,
	...props
}) => {
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

	const schema = resetForm
		? forgotNewPasswordSchema(lang)
		: forgotLinkSchema(lang);

	const router = useRouter();
	const classes = `${styles["logreg-box"]} ${className || ""}`;
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
			router.push("/registration");
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
							<Link href='/registration' onClick={changeWebstiteHandler}>
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
