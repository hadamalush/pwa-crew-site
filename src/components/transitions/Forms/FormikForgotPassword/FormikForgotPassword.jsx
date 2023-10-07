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

const FormikForgotPassword = ({ resetId, className, ...props }) => {
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
			router.push("/rejestracja");
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
			? { email: email, status: resetForm }
			: {
					password: password,
					confirmPassword: confirmPassword,
					code: code,
					status: resetForm,
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
					message: "Niepowodzenie, spróbuj ponownie później.",
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
						<h1>Zapomniałeś hasła?</h1>

						{!resetForm && (
							<InputFormik
								name='email'
								placeholder='Email'
								aria-label='Email'
								type='text'
							/>
						)}
						{resetForm && (
							<>
								<InputFormik
									name='password'
									placeholder='Nowe hasło'
									aria-label='Nowe hasło'
									type='password'
								/>
								<InputFormik
									name='confirmPassword'
									placeholder='Powtórz hasło'
									aria-label='Powtórz hasło'
									type='password'
								/>
								<InputFormik
									name='code'
									placeholder='Kod resetujący hasło'
									aria-label='Kod resetujący hasło'
									type='text'
								/>
							</>
						)}

						<ButtonMain type='submit' variant={"btnSkewRight"}>
							{resetForm ? "Zmień hasło" : "Zresetuj hasło"}
						</ButtonMain>

						<p>
							Nie masz konta?
							<Link href='/rejestracja' onClick={changeWebstiteHandler}>
								Zarejestruj
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</FormContainerBlur>
	);
};

export default FormikForgotPassword;
